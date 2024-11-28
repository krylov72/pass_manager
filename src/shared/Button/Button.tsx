import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import s from './Button.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...rest }: PropsWithChildren<Props>) => {
  return (
    <button className={s.button} {...rest}>
      {children}
    </button>
  )
}

export default Button
