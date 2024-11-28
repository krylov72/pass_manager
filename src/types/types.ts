export type FormCommonType = {
  service: string
  password: string
}

export type GeneratePassForm = {
  length: number
  useLetters: boolean
  useNumbers: boolean
  useSymbols: boolean
  Case: 'upper' | 'lower' | 'random'
  customChars: string
}

export type LocalStorageDB = [string, string][]

export type AlertType = {
  isShow: boolean
  message: string
  success: boolean
}

export type LocalStorageContextType = {
  items: LocalStorageDB
  addItem: (data: FormCommonType) => void
  removeItem: (key: string) => void
}
