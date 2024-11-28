import { useForm } from 'react-hook-form'

import { GeneratePassForm } from '../../../types/types'

export const useGeneratePassword = () => {
  const methods = useForm<GeneratePassForm>({
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

  const customChars = methods.watch('customChars')
  const useNumbers = methods.watch('useNumbers')
  const useLetters = methods.watch('useLetters')
  const useSymbols = methods.watch('useSymbols')
  const isOptionSelected =
    !useNumbers && !useLetters && !useSymbols && !customChars
  const isCustomCharsSelected = customChars.length > 0

  return {
    methods,
    customChars,
    useLetters,
    useNumbers,
    useSymbols,
    isOptionSelected,
    isCustomCharsSelected,
  }
}
