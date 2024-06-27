export function setObject(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj))
}

export function getObject(name) {
  return JSON.parse(localStorage.getItem(name))
}
