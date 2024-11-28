import { Controller } from 'react-hook-form'
import { useAddPassword } from './hooks'
import s from './AddPasswordModal.module.scss'
import { Button } from '@shared/Button'
import { Alert } from '@shared/Alert'
import { GeneratePasswordModal } from '@components/GeneratePasswordModal'

export const AddPasswordModal = () => {
  const {
    methods,
    onFormSubmit,
    showGenerateModal,
    setShowGenerateModal,
    setIsAlert,
    handlePasswordThrower,
    isAlert,
    isName,
    isPassword,
  } = useAddPassword()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  return (
    <div className={s.container}>
      <form className={s.form_container} onSubmit={handleSubmit(onFormSubmit)}>
        <Controller
          name='service'
          control={control}
          rules={{
            required: { value: true, message: 'Имя обязательно' },
            minLength: { value: 4, message: 'Минимальная длинна 4 символа' },
          }}
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
          rules={{
            required: { value: true, message: 'Пароль обязателен' },
            minLength: { value: 4, message: 'Минимальная длинна 4 символа' },
          }}
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

      {isAlert.isShow && (
        <Alert
          message={isAlert.message}
          onClose={() =>
            setIsAlert({ isShow: false, message: '', success: false })
          }
          timeOnClose={2000}
          success={isAlert.success}
        />
      )}

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
