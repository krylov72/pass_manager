import { FormCommontype } from '../types/types'

export const localStorageHelper = {
  set(value: FormCommontype) {
    localStorage.setItem(value.service, value.password)
  },
  get(key: string) {
    return JSON.parse(localStorage.get(key))
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
}
