import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FormCommonType, LocalStorageContextType } from 'src/types'

const LocalStorageContext = createContext<LocalStorageContextType | null>(null)

//Решение приходило очень долго, потому что логика реализована таким образом:
//Пароль сетается в другой компоненте, а передавать пропсы из низа наверх и потом опять вниз не лучший выход, лишний код
//Если будет необходимо, реализую через пропсы

export const useLocalStorage = (): LocalStorageContextType | null => {
  const context = useContext(LocalStorageContext)

  if (!context) {
    return null
  }

  return context // Теперь context гарантированно не undefined
}

export const LocalStorageProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<Array<[string, string]>>([])

  const getItemsFromLocalStorage = () => {
    return Object.entries({ ...localStorage })
  }

  const addItem = (data: FormCommonType) => {
    localStorage.setItem(data.service, data.password)
    setItems(getItemsFromLocalStorage())
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
    setItems(getItemsFromLocalStorage())
  }

  useEffect(() => {
    setItems(getItemsFromLocalStorage())
  }, [])

  return (
    <LocalStorageContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </LocalStorageContext.Provider>
  )
}
