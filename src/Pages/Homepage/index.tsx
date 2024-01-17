import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { ShortLink } from '../../components/ShortLink';
import style from './style.module.css';

interface IResult {
  url: string;
  tiny: string
}

const Homepage = () => {

  const coreRef = useRef<HTMLElement>(null)
  const [saveLinks, setSaveLinks] = useState<IResult[]>([])

  useEffect(() => {
    if (coreRef.current) {
      coreRef.current.style.setProperty("--qtd-items", `${saveLinks.length}`);
    }
  }, [coreRef, saveLinks])

  function loadingLinks(data: IResult[]) {
    setSaveLinks(data)
  }

  function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  function copyLink(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, url: string){
    const button = ev.target as HTMLButtonElement
    button.setAttribute('data-copy', 'active')
     button.setAttribute('disabled', 'true')

    button.textContent = "Copied!"
    copyTextToClipboard(url)
  }

  return (
    <main className={style.homepage}>
      <Header />

      <section className={style.apresentation}>
        <div className={style.container}>
          <h1 className={style.title}>More than just shorter links</h1>
          <p className={style.description}>
            Build your brand’s recognition and get detailed insights
            on how your links are performing.
          </p>
          <Button isBg={true} border={'rounded'}>Get Started</Button>
        </div>
        <div className={[style.container, style.image].join(" ")}>
          <img src="/images/illustration-working.svg" alt="illustration working" />
        </div>
      </section>

      <section className={style.core} ref={coreRef}>
        <div className={style.container__form}>

          <ShortLink getLink={loadingLinks} />

          <ul className={style.result}>
            {
              saveLinks && saveLinks.map(({ url, tiny }) => {
                return (
                  <li className={style.result__item} key={tiny}>
                    <span className={style.oldLink} title={url}>{url}</span>
                    <div className={style.actions}>
                      <span className={style.newLink}>{tiny}</span>
                      <Button onClick={ev => copyLink(ev, tiny)} isBg={true} size="small" border={'square'}>Copy</Button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className={style.container__about}>
          <h2 className={style.title}>Advanced Statistics</h2>
          <p className={style.description}>
            Track how your links are performing across the web with our
            advanced statistics dashboard.
          </p>
          <div className={style.container__card}>
            <div className={style.card}>
              <div className={style.container__icon}>
                <img src="/images/icon-brand-recognition.svg" alt="icon brand recognition" className={style.icon} />
              </div>
              <h3 className={style.title}>Brand Recognition</h3>
              <p className={style.description}>Boost your brand recognition with each click. Generic links don’t
                mean a thing. Branded links help instil confidence in your content.</p>
            </div>
            <div className={style.card}>
              <div className={style.container__icon}>
                <img src="/images/icon-detailed-records.svg" alt="icon detailed records" className={style.icon} />
              </div>
              <h3 className={style.title}>Detailed Records</h3>
              <p className={style.description}>Gain insights into who is clicking your links. Knowing when and where
                people engage with your content helps inform better decisions.</p>
            </div>
            <div className={style.card}>
              <div className={style.container__icon}>
                <img src="/images/icon-fully-customizable.svg" alt="icon fully customizable" className={style.icon} />
              </div>
              <h3 className={style.title}>Fully Customizable</h3>
              <p className={style.description}>Improve brand awareness and content discoverability through customizable
                links, supercharging audience engagement.</p>
            </div>
          </div>
        </div>
      </section>


      <section className={style.callToAction}>
        <h2 className={style.title}>Boost your links today</h2>
        <Button isBg={true} border={'rounded'}>Get Started</Button>
      </section>


      <footer className={style.footer}>
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className="brand">
              <img src="/images/logo.svg" alt="logo" />
            </div>
          </div>
          <div className={style.container}>
            <h4 className={style.menu__title}>Features</h4>
            <ul className={style.menu}>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Link Shortening</a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Branded Links</a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Analytics</a></li>
            </ul>

          </div>
          <div className={style.container}>
            <h4 className={style.menu__title}>Resources</h4>
            <ul className={style.menu}>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Blog</a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Developers</a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Support</a></li>
            </ul>
          </div>
          <div className={style.container}>
            <h4 className={style.menu__title}>Company</h4>
            <ul className={style.menu}>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>About</a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Our Team</a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Careers</a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}>Contact</a></li>
            </ul>
          </div>
          <div className={style.container}>
            <ul className={style.socialMenu}>
              <li className={style.menu__item}><a href="#" className={style.menu__link}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#FFF" d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" /></svg></a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#FFF" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#FFF" d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg></a></li>
              <li className={style.menu__item}><a href="#" className={style.menu__link}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#FFF" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  )
}

export { Homepage }