import { useEffect, useState } from 'react';
import { Button } from '../Button';
import style from './style.module.css';

const Header = () => {

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenuState = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  useEffect(() => {
    const body = document.querySelector('body');
    if (isOpenMenu) {
      if (body) body.style.overflow = 'hidden'
    } else {
      if (body) body.style.overflowY = 'visible'
    }
  }, [isOpenMenu])

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.brand}>
          <img src="/images/logo.svg" alt="shortly" />
        </div>
        <div className={style.container__menu} data-open={isOpenMenu}>
          <ul className={style.menu}>
            <li className={style.menu__item}><a href="#" className={style.menu__link}>Features</a></li>
            <li className={style.menu__item}><a href="#" className={style.menu__link}>Pricing</a></li>
            <li className={style.menu__item}><a href="#" className={style.menu__link}>Resources</a></li>
          </ul>
          <div className={style.groupButtons}>
            <Button size="small" isBg={false} border={'rounded'} >Login</Button>
            <Button size="small" isBg={true} border={'rounded'} >Sign Up</Button>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.groupButtons}>
          <Button size="small" isBg={false} border={'rounded'} >Login</Button>
          <Button size="small" isBg={true} border={'rounded'} >Sign Up</Button>
        </div>
        <button data-menu-open={isOpenMenu} className={style.btn__menu} onClick={toggleMenuState}>
          <span className={style.btn__line}></span>
          <span className={style.btn__line}></span>
          <span className={style.btn__line}></span>
        </button>
      </div>
    </header>
  )
}

export { Header }