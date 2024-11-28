import { useEffect, useState } from 'react'
import s from './PasswordContainer.module.scss'
import { LocalStorageDB } from '../../types/types'
import { localStorageHelper } from '../../utils/localStorageHelper'

export const PasswordContainer = () => {
  const [items, setItems] = useState<LocalStorageDB>([])

  const getItemsFromLocalStorage = () => {
    return Object.entries({ ...localStorage })
  }

  useEffect(() => {
    const items = getItemsFromLocalStorage()
    setItems(items)
  }, [])

  const removeHandler = (key: string) => {
    localStorageHelper.remove(key)
    setItems(getItemsFromLocalStorage())
  }

  return (
    <div className={s.container}>
      <table>
        <caption>Сохраненные контейнеры</caption>
        <thead>
          <tr>
            <th>Сервис</th>
            <th>Пароль</th>
          </tr>
        </thead>
        <tbody>
          {items.map((el) => (
            <tr key={el[0]}>
              <td>{el[0]}</td>
              <td>{el[1]}</td>
              <td style={{ border: 'none' }}>
                <button onClick={() => removeHandler(el[0])}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
