import {
  ChangedSettingsType,
  PhotosType,
  ProfileType,
} from './../components/common/Types'
import { AxiosRequestConfig } from 'axios'
import { instance, APIResponseType } from './api'

type SavePhotoResponseDataType = {
  photos: PhotosType
}

export const profileAPI = {
  async getProfile(userId: number) {
    const res = await instance.get<ProfileType>(`profile/${userId}`)
    return res.data
  },

  async getStatus(userId: number) {
    const res = await instance.get<string>(`profile/status/${userId}`)
    return res.data
  },

  async updateStatus(status: string) {
    const res = await instance.put<APIResponseType>(`profile/status`, {
      status,
    })
    return res.data
  },

  async saveAvatar(file: File, config: AxiosRequestConfig) {
    let formData = new FormData()
    formData.append('image', file)
    const res = await instance.put<APIResponseType<SavePhotoResponseDataType>>(
      `profile/photo`,
      formData,
      config
    )
    return res.data
  },

  async updateSettings(profile: ChangedSettingsType) {
    const res = await instance.put<APIResponseType>(`profile`, profile)
    return res.data
  },
}
