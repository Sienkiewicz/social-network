export type ContactsType = {
  [key: string]: any
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type PhotosType = {
  small: null | string | File
  large: null | string | File
}
export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: File | PhotosType
  aboutMe: string
}
export type ChangedSettingsType = {
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
}

export type UserType = {
  name: string
  id: number
  photos: PhotosType
  status: null | string
  followed: boolean
}

export type PostType = {
  id: number
  post: string
  count: number
}
