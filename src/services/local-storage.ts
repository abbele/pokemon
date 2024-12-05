export const getLocalStorage = (key: string) => {
  if (!localStorage.getItem(key)) return

  try {
    return JSON.parse(localStorage.getItem(key)!)
  } catch (e) {
    console.error(e)
  }
}
export const setLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(e)
  }
}
export const removeLocalStorage = (key: string) => localStorage.removeItem(key)
