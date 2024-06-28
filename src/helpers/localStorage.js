export function setObjectToLocalStorage(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj))
}

export function getObjectToLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name))
}
