import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

let initialState = {
	id: null,
	email: null,
	login: null,
	isFetching: false,
	isAuth: false,
	captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
			};

		case SET_CAPTCHA_URL:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });
export const setCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA_URL, payload: { captchaUrl } });

export const getAuthUserData = () => async (dispatch) => {
	const response = await authAPI.me();
	if (response.data.resultCode === 0) {
		let { id, email, login } = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	try {
		const response = await authAPI.login(email, password, rememberMe, captcha);
		if (response.data.resultCode === 0) {
			dispatch(getAuthUserData());
		}
		else {
			if (response.data.resultCode === 10) {
			dispatch(getCaptchaUrl())
			}
		}
	} catch (error) {
		dispatch(stopSubmit('login', { _error: error }));
	}
}

export const getCaptchaUrl = () => async (dispatch) => {
	const response = await authAPI.getCaptcha()
	const captcha = response.data.url;
	dispatch(setCaptchaUrl(captcha));
}

export const logout = () => async (dispatch) => {
	const response = await authAPI.logout()
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	};
}


export default authReducer;