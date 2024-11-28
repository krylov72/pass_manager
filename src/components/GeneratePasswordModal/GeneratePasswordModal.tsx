import { Controller, useForm } from 'react-hook-form'
import { GeneratePassForm } from '../../types/types'
import { GeneratePassword } from '../../utils/GeneratePassword'
import s from './GeneratePasswordModal.module.scss'
import Button from '../../shared/Button/Button'

type Props = {
  throwPassword: (password: string) => void
  closeModal: () => void
}
export const GeneratePasswordModal = ({ throwPassword, closeModal }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GeneratePassForm>({
    defaultValues: {
      length: 4,
      useLetters: false,
      useNumbers: false,
      useSymbols: false,
      Case: 'random',
      customChars: '',
    },
    mode: 'onChange',
  })

  const customChars = watch('customChars')
  const useNumbers = watch('useNumbers')
  const useLetters = watch('useLetters')
  const useSymbols = watch('useSymbols')
  const isOptionSelected =
    !useNumbers && !useLetters && !useSymbols && !customChars
  const isCustomCharsSelected = customChars.length > 0

  const onFormSubmit = (data: GeneratePassForm) => {
    const password = GeneratePassword(data)
    throwPassword(password)
  }

  return (
    <div className={s.container}>
      <form className={s.form_container} onSubmit={handleSubmit(onFormSubmit)}>
        <Controller
          name='length'
          control={control}
          rules={{
            required: true,
            max: { value: 12, message: 'Максимальная длинна 12 символов' },
            min: { value: 4, message: 'Минимальная длинна 4 символа' },
            pattern: { value: /^[0-9]+$/, message: 'Используйте число' },
          }}
          render={({ field }) => (
            <div className={s.input__wrapper}>
              <label className={s.form__input_label} htmlFor='length'>
                Количество символов
              </label>
              <input
                className={s.form__input}
                type='number'
                id='length'
                min={4}
                {...field}
                required
              />
              {errors.length && (
                <p className={s.input__errors}>{errors.length.message}</p>
              )}
            </div>
          )}
        />
        <p className={s.options_container}>Выберите опции:</p>
        <Controller
          name='useLetters'
          control={control}
          render={({ field }) => (
            <div>
              <label className={s.form__input_checkbox}>
                Использовать буквы?
                <input
                  type='checkbox'
                  {...field}
                  disabled={isCustomCharsSelected}
                />
              </label>
            </div>
          )}
        />

        <Controller
          name='useNumbers'
          control={control}
          render={({ field }) => (
            <div>
              <label className={s.form__input_checkbox}>
                Использовать числа?
                <input
                  type='checkbox'
                  {...field}
                  disabled={isCustomCharsSelected}
                />
              </label>
            </div>
          )}
        />

        <Controller
          name='useSymbols'
          control={control}
          render={({ field }) => (
            <div>
              <label className={s.form__input_checkbox}>
                Использовать символы?
                <input
                  type='checkbox'
                  {...field}
                  disabled={isCustomCharsSelected}
                />
              </label>
            </div>
          )}
        />

        <Controller
          name='Case'
          control={control}
          render={({ field }) => (
            <div className={s.input__wrapper}>
              <label
                className={s.form__input_checkbox}
                htmlFor='register-option'
              >
                Выберите регистр:
              </label>
              <select
                {...field}
                id='register-option'
                disabled={isCustomCharsSelected}
                className={s.form__selector}
              >
                <option value='upper'>Верхний регистр</option>
                <option value='lower'>Нижний регистр</option>
                <option value='random'>Random</option>
              </select>
            </div>
          )}
        />

        <Controller
          name='customChars'
          control={control}
          rules={{
            minLength: { value: 4, message: 'Минимальная длинна 4 символа' },
          }}
          render={({ field }) => (
            <div className={s.input__wrapper}>
              <label htmlFor='customChars' className={s.form__input_label}>
                Свои символы
              </label>
              <input
                className={s.form__input}
                autoComplete='off'
                type='text'
                id='customChars'
                {...field}
              />
              {errors.customChars && (
                <p className={s.input__errors}>{errors.customChars.message}</p>
              )}
            </div>
          )}
        />
        <div className={s.form_container__action}>
          <Button
            disabled={isOptionSelected || !!errors.customChars?.message?.length}
            type='submit'
          >
            Создать
          </Button>
          {isOptionSelected && (
            <p className={s.input__errors}>Выберите настройки</p>
          )}
        </div>

        <Button type='button' onClick={closeModal}>
          Закрыть
        </Button>
      </form>
    </div>
  )
}