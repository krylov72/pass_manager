import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import s from './Button.module.scss'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }

export const Button = ({
  children,
  className,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <button className={clsx(s.button, className)} {...rest}>
      {children}
    </button>
  )
}

export default Button
