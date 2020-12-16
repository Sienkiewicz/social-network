import {
  instance,
  ResultCodesEnum,
  ResultCodesForCaptcha,
  APIResponseType,
} from './api'

type LoginResponseDataType = {
  id: number
}
type MeResponseDataType = {
  id: number
  email: string
  login: string
}
type GetCaptchaUrlType = {
  url: string
}

export const authAPI = {
  async me() {
    const res = await instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
    return res.data
  },

  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance.post<
      APIResponseType<
        LoginResponseDataType,
        ResultCodesForCaptcha | ResultCodesEnum
      >
    >(`auth/login`, { email, password, rememberMe, captcha })
  },

  logout() {
    return instance.delete(`auth/login`)
  },

  async getCaptcha() {
    const res = await instance.get<GetCaptchaUrlType>(`security/get-captcha-url`)
    return res.data
  },
}
