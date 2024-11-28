import { PropsWithChildren } from 'react'
import s from './Container.module.scss'

export const Container = ({ children }: PropsWithChildren) => {
  return <div className={s.container}>{children}</div>
}
