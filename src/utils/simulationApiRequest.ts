export const simulationApiRequest = (): Promise<boolean> => {
  return new Promise((res) => {
    setTimeout(() => {
      const result = Math.random() < 0.5
      res(result)
    }, 1000)
  })
}
