import { ChangedSettingsType, ProfileType } from './../components/common/Types';
import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'd140758e-ddf4-4d65-a308-cda36309f4e7',
	},
})

export const usersAPI = {
	async getUsers(currentPage = 1, pageSize = 10, term='') {

		const response = await instance.get(
			`users?page=${ currentPage }&count=${ pageSize }&term=${term}`);
		return response.data;

	},

	async follow(userId: number) {
		const response = await instance.post(
			`follow/${ userId }`,
			{});
		return response.data;
	},

	async unfollow(userId: number) {
		const response = await instance.delete(
			`follow/${ userId }`,
			{});
		return response.data;
	},

	getProfile(userId: number) {
		console.warn('Absolute method. Please use profileAPI object')
		return profileAPI.getProfile(userId)
	},
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`)
  },

  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
  },

  updateStatus(status: string) {
    return instance.put(`profile/status`, { status })
  },

  saveAvatar(file: File, config: AxiosRequestConfig) {
    let formData = new FormData()
    formData.append('image', file)
    return instance.put(`profile/photo`, formData, config)
  },

  updateSettings(profile: ChangedSettingsType) {
    return instance.put(`profile`, profile)
  },
}

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum ResultCodesForCaptcha {
	CaptchaIsRequired = 10
}

export type LoginResponseType = {
	data: {id: number}
	resultCode: ResultCodesEnum | ResultCodesForCaptcha
	messages: string
}
type MeResponseType = {
	data: {id: number, email: string, login: string}
	resultCode: ResultCodesEnum
	messages: string[]
}

export const authAPI = {
	async me() {
		const res = await instance.get<MeResponseType>(`auth/me`);
		return res.data;
	},

	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return instance.post<LoginResponseType>(`auth/login`, {
			email, password, rememberMe, captcha
		})
	},
 
	logout() { 
		return instance.delete(`auth/login`)
	},
	
	getCaptcha() {
		return instance.get(`security/get-captcha-url`)
	}
}

