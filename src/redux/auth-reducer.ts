import { FormAction, stopSubmit } from 'redux-form'
import { InferActionTypes, BaseTThunk } from './redux-store'
import { ResultCodesEnum, ResultCodesForCaptcha } from '../api/api'
import { authAPI } from '../api/authAPI'

let initialState = {
  id: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as null | string,
  error: [] as string[],
}

const authReducer = (
  state: InitialStateAuthType = initialState,
  action: ActionTypes
): InitialStateAuthType => {
  switch (action.type) {
    case 'SN/AUTH/SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      }

    case 'SN/AUTH/SET_CAPTCHA_URL':
      return {
        ...state,
        ...action.payload,
      }

    case 'SN/AUTH/TOGGLE_FETCHING_LOGIN':
      return {
        ...state,
        ...action.payload,
      }

    case 'SN/AUTH/ADD_ERROR_MESSAGES':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export const actions = {
  setAuthUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({ type: 'SN/AUTH/SET_USER_DATA', payload: { id, email, login, isAuth } } as const),
  setCaptchaUrl: (captchaUrl: string) =>
    ({ type: 'SN/AUTH/SET_CAPTCHA_URL', payload: { captchaUrl } } as const),
  toggleFetchingLogin: (isFetching: boolean) =>
    ({ type: 'SN/AUTH/TOGGLE_FETCHING_LOGIN', payload: { isFetching } } as const),
  addErrorMessages: (error: string[]) =>
    ({ type: 'SN/AUTH/ADD_ERROR_MESSAGES', payload: { error } } as const),
}

export const getAuthUserData = (): TThunk => async (dispatch) => {
  const meData = await authAPI.me()
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = meData.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: null | string
): TThunk => async (dispatch) => {
  try {
    dispatch(actions.toggleFetchingLogin(true))
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
      dispatch(actions.toggleFetchingLogin(false))
    } else {
      if (
        response.data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired
      ) {
        dispatch(getCaptchaUrl())
        dispatch(actions.toggleFetchingLogin(false))
      } else {
        if (response.data.resultCode !== 0) {
          dispatch(actions.toggleFetchingLogin(false))
          dispatch(actions.addErrorMessages(response.data.messages))
        }
      }
    }
  } catch (error) {
    dispatch(stopSubmit('login', { _error: error }))
    dispatch(actions.toggleFetchingLogin(false))
  }
}

export const getCaptchaUrl = (): TThunk => async (dispatch) => {
  const data = await authAPI.getCaptcha()
  const captcha = data.url
  dispatch(actions.setCaptchaUrl(captcha))
}

export const logout = (): TThunk => async (dispatch) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export default authReducer

export type InitialStateAuthType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type TThunk = BaseTThunk<ActionTypes | FormAction>
