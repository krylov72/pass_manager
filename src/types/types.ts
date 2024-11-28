export type FormCommontype = {
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
