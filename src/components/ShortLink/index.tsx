import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import style from './style.module.css';
import { Loading } from '../Loading';

interface IResult {
  url: string;
  tiny: string
}

interface IShortLinks {
  getLink: (data: IResult[]) => void
}

export const ShortLink: React.FC<IShortLinks> = ({ getLink }) => {

  const storedLinks = JSON.parse(localStorage.getItem("short_links") || '[]')

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<IResult[]>(storedLinks);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getLink(result)
    localStorage.setItem('short_links', JSON.stringify(result))
  }, [result])


  const createShortLink = async (link: string) => {
    const serviceURL = 'http://api.tinyurl.com/create'
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${process.env.API_TOKEN}`
    }
    const data = {
      url: link,
    }

    try {
      const response = await fetch(serviceURL, {
        method: "POST",
        mode: "cors",
        headers,
        body: JSON.stringify(data)
      })

      if (response.status === 200) {

        const { data } = await response.json()

        if (result.length === 3) {
          const lastResult = result;
          lastResult[0] = lastResult[1]
          lastResult[1] = lastResult[2]
          lastResult[2] = { url: link, tiny: data.tiny_url }
          setResult([...lastResult])
        } else {
          setResult(result => [...result, { url: link, tiny: data.tiny_url }])
        }
      }
    } catch (error: any) {
      setError(error?.message || '')
    }


    setLoading(false)
  }

  const validateLink = (link: string): boolean => {
    try {
      const newUrl = new URL(link);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
      return false;
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    const button = event.target as HTMLButtonElement;
    button.disabled = true;
    setLoading(true)

    if (input === '') {
      setError('Please add a link')

      button.disabled = false;
      setLoading(false)
    }

    if (input) {
      const isValid = validateLink(input);
      if (!isValid) {
        setError('Link invalid')

        button.disabled = false;
        setLoading(false)
      }

      if (isValid) {
        setError("")
        createShortLink(input).catch(console.error)
        button.disabled = false;
      }
    }
  }


  return (
    <fieldset className={style.inputGroup} data-error={error === '' ? false : true}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        data-valid={error !== '' ? false : true}
        type="text"
        className={style.input}
        placeholder='Shorten a link here...'
      />
      <Button
        isBg={true}
        border={'square'}
        onClick={handleSubmit} >
        {loading ? <Loading /> : 'Shorten It!'}
      </Button>
      <p className={style.showError}>{error}</p>
    </fieldset>
  )
}