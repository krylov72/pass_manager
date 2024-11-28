import { useState } from 'react'
import { FormCommontype } from '../../types/types'
import { Controller, useForm } from 'react-hook-form'
import s from './AddPasswordModal.module.scss'
import { simulationApiRequest } from '../../utils/simulationApiRequest'
import { localStorageHelper } from '../../utils/localStorageHelper'
import { GeneratePasswordModal } from '../GeneratePasswordModal/GeneratePasswordModal'
import Button from '../../shared/Button/Button'

export const AddPasswordModal = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormCommontype>({
    defaultValues: {
      password: '',
      service: '',
    },
    mode: 'onChange',
  })

  const [showGenerateModal, setShowGenerateModal] = useState(false)

  const isPassword = watch('password')
  const isName = watch('service')

  const handlePasswordThrower = (password: string) => {
    setValue('password', password)
  }

  const onFormSubmit = async (data: FormCommontype) => {
    const response = await simulationApiRequest()
    try {
      if (response) {
        localStorageHelper.set(data)
        reset()
      } else {
        alert('Контейнер не добавлен, попробуйте ещё раз')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.container}>
      <form className={s.form_container} onSubmit={handleSubmit(onFormSubmit)}>
        <Controller
          name='service'
          control={control}
          rules={{ required: { value: true, message: 'Name is required' } }}
          render={({ field }) => (
            <div className={s.input__wrapper}>
              <input
                className={s.form__input}
                autoComplete='off'
                type='text'
                id='service'
                required
                {...field}
              />
              <label className={s.form__label} htmlFor='service'>
                Имя сервиса
              </label>
              {errors.service && (
                <p className={s.input__errors}>{errors.service.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name='password'
          control={control}
          rules={{ required: { value: true, message: 'Password is required' } }}
          render={({ field }) => (
            <div className={s.input__wrapper}>
              <input
                className={s.form__input}
                type='text'
                {...field}
                id='password'
                required
                disabled={showGenerateModal}
                autoComplete='off'
              />
              <label className={s.form__label} htmlFor='password'>
                Пароль
              </label>
              {errors.password && (
                <p className={s.input__errors}>{errors.password?.message}</p>
              )}
            </div>
          )}
        />
        <div className={s.buttons_container}>
          <Button
            type='button'
            onClick={() => setShowGenerateModal(!showGenerateModal)}
          >
            Генерировать пароль
          </Button>
          <Button type='submit' disabled={!isName || !isPassword}>
            Сохранить
          </Button>
        </div>
      </form>

      {showGenerateModal && (
        <GeneratePasswordModal
          throwPassword={handlePasswordThrower}
          closeModal={() => {
            setShowGenerateModal(!showGenerateModal)
          }}
        />
      )}
    </div>
  )
}
