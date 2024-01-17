import React from 'react'
import style from './style.module.css'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  isBg: boolean,
  border: 'rounded' | 'square',
  size?: 'small' | 'default'
}

const Button: React.FC<IButton> = ({ children, isBg, size = 'default', border, ...rest }) => {
  return <button
    {...rest}
    className={[style.button, rest.className].join(" ")}
    data-bg={isBg}
    data-border={border}
    data-size={size}
  >
    {children}
  </button>
}

export { Button }