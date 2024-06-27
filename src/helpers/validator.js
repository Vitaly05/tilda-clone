export function validateEmail(email) {
  const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/
  return regex.test(email)
}

export function validatePassword(password) {
  return password.length > 0
}
