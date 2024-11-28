import { useLocalStorage } from '@shared/LocalStorageContext'
import { simulationApiRequest } from '@utils/simulationApiRequest'
import { useEffect, useState } from 'react'
import { AlertType } from 'src/types'

export const usePasswordContainer = () => {
  const localStorageItems = useLocalStorage()
  const [currentPage, setCurrentPage] = useState(1)
  const [isAlert, setIsAlert] = useState<AlertType>({
    isShow: false,
    message: '',
    success: false,
  })
  const [filterText, setFilterText] = useState('')
  const [totalPages, setTotalPages] = useState(1)

  const filteredItems = localStorageItems?.items.filter(
    ([service]: [string, string]) => {
      return service.toLowerCase().includes(filterText.toLowerCase())
    }
  )

  const copyToClipboard = (el: string) => {
    navigator.clipboard.writeText(el)
    setIsAlert({
      isShow: true,
      message: 'Пароль скопирован!',
      success: true,
    })
  }

  const removeHandler = async (key: string) => {
    const response = await simulationApiRequest()
    try {
      if (response) {
        localStorageItems?.removeItem(key)
        setIsAlert({
          isShow: true,
          message: 'Контейнер успешно удалён!',
          success: true,
        })
      } else {
        setIsAlert({
          isShow: true,
          message: 'Внутренняя ошибка, попробуйте ещё раз',
          success: false,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const itemsPerPage = 5

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    if (filteredItems) {
      const newTotalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1
      setTotalPages(newTotalPages)
      setCurrentPage(Math.min(currentPage, newTotalPages) || 1)
    }
  }, [filteredItems, itemsPerPage, currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return {
    copyToClipboard,
    filterText,
    filteredItems,
    isAlert,
    setFilterText,
    removeHandler,
    setIsAlert,
    handleNextPage,
    currentPage,
    totalPages,
    handlePrevPage,
    currentItems,
  }
}
