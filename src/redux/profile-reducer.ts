import { ChangedSettingsType, PostType } from './../components/common/Types'
import { AxiosRequestConfig } from 'axios'

import { InferActionTypes, BaseTThunk } from './redux-store'
import { profileAPI } from '../api/profileAPI'
import { ProfileType } from '../components/common/Types'

let initialState = {
  posts: [
    {
      id: 0,
      post:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, obcaecati. Voluptas ut non earum voluptates quidem quam odit est numquam deleniti veniam, enim consequuntur corporis, quibusdam dolorem, incidunt repellat corrupti alias officiis aspernatur cumque voluptate! Libero sint quis voluptate beatae, dolor hic quibusdam sed enim cupiditate doloremque perferendis ullam voluptas.',
      count: 10,
    },
    {
      id: 1,
      post: 'Hi there',
      count: 15,
    },
  ] as PostType[],
  profile: null as null | ProfileType,
  status: '',
  isFetching: false,
  isAvatarFetching: false,
  errorMessages: [] as string[],
  isEditMode: false,
}

const profileReducer = (
  state: InitialStateProfileType = initialState,
  action: ActionTypes
): InitialStateProfileType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST':
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: 2,
            post: action.textOfNewPost,
            count: 0,
          },
        ],
      }

    case 'SN/PROFILE/SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      }
    }

    case 'SN/PROFILE/SET_USER_STATUS': {
      return {
        ...state,
        status: action.status,
      }
    }

    case 'SN/PROFILE/TOGGLE_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }

    case 'SN/PROFILE/SAVE_AVATAR_TO_STATE': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.file } as ProfileType,
      }
    }

    case 'SN/PROFILE/TOGGLE_FETCHING_AVATAR': {
      return {
        ...state,
        isAvatarFetching: action.isFetching,
      }
    }

    case 'SN/PROFILE/SET_ERROR_MESSAGES': {
      return {
        ...state,
        errorMessages: action.messages,
      }
    }

    case 'SN/PROFILE/TOGGLE_EDIT_MODE': {
      return {
        ...state,
        isEditMode: action.isEditMode,
      }
    }

    default:
      return state
  }
}
export const actions = {
  addPostActionCreator: (textOfNewPost: string) =>
    ({ type: 'SN/PROFILE/ADD_POST', textOfNewPost } as const),
  setUserProfile: (profile: ProfileType) =>
    ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
  setUserStatus: (status: string) =>
    ({ type: 'SN/PROFILE/SET_USER_STATUS', status } as const),
  toggleFetching: (isFetching: boolean) =>
    ({ type: 'SN/PROFILE/TOGGLE_FETCHING', isFetching } as const),
  saveAvatarToState: (file: any) =>
    ({ type: 'SN/PROFILE/SAVE_AVATAR_TO_STATE', file } as const),
  toggleFetchingAvatar: (isFetching: boolean) =>
    ({ type: 'SN/PROFILE/TOGGLE_FETCHING_AVATAR', isFetching } as const),
  setErrorMessages: (messages: string[]) =>
    ({ type: 'SN/PROFILE/SET_ERROR_MESSAGES', messages } as const),
  toggleEditMode: (isEditMode: boolean) =>
    ({ type: 'SN/PROFILE/TOGGLE_EDIT_MODE', isEditMode } as const),
}

export const getUserProfile = (userId: number): TThunk => async (dispatch) => {
  try {
    dispatch(actions.toggleFetching(true))
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.toggleFetching(false))
    dispatch(actions.setUserProfile(data))
  } catch (error) {}
}

export const getUserStatus = (userId: number): TThunk => async (dispatch) => {
  try {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setUserStatus(data))
    if (data.length > 0) {
    }
  } catch (error) {}
}

export const updateUserStatus = (status: string): TThunk => async (
  dispatch
) => {
  const data = await profileAPI.updateStatus(status)
  if (data.resultCode === 0) {
    dispatch(actions.setUserStatus(status))
  }
}

export const savePhoto = (
  file: File,
  config: AxiosRequestConfig
): TThunk => async (dispatch) => {
  dispatch(actions.toggleFetchingAvatar(true))
  const data = await profileAPI.saveAvatar(file, config)
  if (data.resultCode === 0) {
    dispatch(actions.saveAvatarToState(data.data.photos))
  }
  setTimeout(() => dispatch(actions.toggleFetchingAvatar(false)), 1000)
}

export const updateUserSettings = (
  settings: ChangedSettingsType
): TThunk => async (dispatch, getState) => {
  const userId = getState().auth.id
  const isEditMode = getState().profilePage.isEditMode
  dispatch(actions.setErrorMessages([]))
  const data = await profileAPI.updateSettings(settings)
  if (data.resultCode === 0) {
    if(userId !== null) {
      dispatch(getUserProfile(userId))
    } else {
      throw new Error("u serId can't be null")
    }
    dispatch(actions.toggleEditMode(!isEditMode))
  } else {
    dispatch(actions.setErrorMessages(data.messages))
  }
}

export default profileReducer

export type InitialStateProfileType = typeof initialState
export type ActionTypes = InferActionTypes<typeof actions>
type TThunk = BaseTThunk<ActionTypes>
