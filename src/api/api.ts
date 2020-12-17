import { UserType } from './../components/common/Types';
import axios from "axios";

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'd140758e-ddf4-4d65-a308-cda36309f4e7',
	},
})

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum ResultCodesForCaptcha {
	CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: UserType[]
  totalCount: number
  error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: string[]
  resultCode: RC
}