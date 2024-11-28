export const simulationApiRequest = (): Promise<boolean> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        const result = Math.random() < 0.5
        res(result)
      } catch (e) {
        rej(e)
      }
    }, 1000)
  })
}
