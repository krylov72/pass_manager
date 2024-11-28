import { useForm } from 'react-hook-form'
import { AlertType, FormCommonType } from '../../../types/types'
import { useLocalStorage } from '../../../shared/LocalStorageContext/LocalStorageContext'
import { useState } from 'react'
import { simulationApiRequest } from '../../../utils/simulationApiRequest'

export const useAddPassword = () => {
  const methods = useForm<FormCommonType>({
    defaultValues: {
      password: '',
      service: '',
    },
    mode: 'onChange',
  })

  const { addItem } = useLocalStorage()

  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [isAlert, setIsAlert] = useState<AlertType>({
    isShow: false,
    message: '',
    success: false,
  })

  const isPassword = methods.watch('password')
  const isName = methods.watch('service')

  const handlePasswordThrower = (password: string) => {
    methods.setValue('password', password)
  }

  const onFormSubmit = async (data: FormCommonType) => {
    const response = await simulationApiRequest()
    try {
      if (response) {
        addItem(data)
        setIsAlert({
          isShow: true,
          message: 'Контейнер успешно сохранен!',
          success: true,
        })
        methods.reset()
      } else {
        setIsAlert({
          isShow: true,
          message: 'Внутрення ошибка, попробуйте ещё раз',
          success: false,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    addItem,
    handlePasswordThrower,
    isAlert,
    isName,
    isPassword,
    methods,
    onFormSubmit,
    showGenerateModal,
    setShowGenerateModal,
    setIsAlert,
  }
}
