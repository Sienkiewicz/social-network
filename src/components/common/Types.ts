export type ContactsType = {
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
}

export type UserType = {
  name: string
  id: number
  photos: File | PhotosType
  status: null | string
  followed: boolean
}
