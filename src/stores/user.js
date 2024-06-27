import { removeCookie, setCookie } from '@/helpers/cookie'
import { defineStore } from 'pinia'

const expires = 15 * 60 * 1000

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: ''
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token
      setCookie('access-token', token, expires)
    },
    removeAccessToken() {
      this.accessToken = ''
      removeCookie('access-token')
    }
  }
})
