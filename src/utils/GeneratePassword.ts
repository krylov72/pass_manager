import { GeneratePassForm } from '../types/types'

export const GeneratePassword = (conditions: GeneratePassForm) => {
  let canUse = ''

  if (conditions.useSymbols) {
    canUse += '!@#$%^&*()_+=-`[]{}|;:\'",.<>/?'
  }

  if (conditions.useLetters) {
    canUse += 'abcdefghijklmnopqrstuvwxyz'
  }

  if (conditions.useNumbers) {
    canUse += '0123456789'
  }

  if (conditions.customChars) {
    canUse += conditions.customChars
  }

  if (canUse === '') return ''

  const result = []
  const randomPass = Array.from(canUse)

  for (let i = 0; i < conditions.length; i++) {
    const index = Math.floor(Math.random() * randomPass.length)
    result.push(randomPass[index])
  }

  let password = result.join('')

  switch (conditions.Case) {
    case 'lower':
      password = password.toLowerCase()
      break
    case 'upper':
      password = password.toUpperCase()
      break
    case 'random':
      password = password
        .split('')
        .map((char) => {
          return Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase()
        })
        .join('')
      break

    default:
      break
  }

  return password
}
