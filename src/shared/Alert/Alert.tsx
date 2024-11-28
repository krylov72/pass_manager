import { createPortal } from 'react-dom'
import Button from '../Button/Button'
import s from './Alert.module.scss'
import { useEffect, useRef } from 'react'

type Props = {
  message: string
  onClose: () => void
  timeOnClose: number
  success: boolean
}

export const Alert = ({ message, onClose, timeOnClose, success }: Props) => {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null) //берем тип у setTimeout func || null
  useEffect(() => {
    timerId.current = setTimeout(onClose, timeOnClose)

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current)
      } // Убиваем таймер при размонтировании компонента
    }
  }, [onClose, timeOnClose])
  return createPortal(
    <div className={`${s.container} ${success ? s.success : s.error}`}>
      <p>{message}</p>
      <Button className={s.alert__button} onClick={onClose}>
        Close
      </Button>
    </div>,
    document.body
  )
}
