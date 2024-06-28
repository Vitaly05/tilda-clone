import { defaultTokenExpiresTime } from '@/data/defaultTokenExpires'
import { removeCookie, setCookie } from '@/helpers/cookie'
import { defineStore } from 'pinia'

const expires = defaultTokenExpiresTime

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
