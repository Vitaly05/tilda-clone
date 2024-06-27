import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('super-secret-key')
const iv = CryptoJS.enc.Utf8.parse('super-secret-iv')

const encryptedCorrectPassword = 'EFqmqWVwMjXhDD414+yexbEpae+kF9nH4E7ksoICa3wgqh7wiznfihzCXf6aOYCS'

export function checkPassword(password) {
  const hash = CryptoJS.AES.encrypt(password, key, {
    iv: iv
  })
  const stringHash = hash.toString()
  return stringHash === encryptedCorrectPassword
}

export function generateToken() {
  const token = CryptoJS.lib.WordArray.random(64)
  return token.toString(CryptoJS.enc.Base64)
}
