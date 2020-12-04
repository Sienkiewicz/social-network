import { AxiosRequestConfig } from 'axios';
import { ThunkAction } from 'redux-thunk';

import { InferActionTypes } from './redux-store';
import { profileAPI } from "../api/api";
import { ProfileType } from '../components/common/Types';

type ActionTypes = InferActionTypes<typeof actions>
export type InitialStateProfileType = typeof initialState

type PostType = {
  id: number
  post: string
  count: number
}

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

const profileReducer = (state: InitialStateProfileType = initialState, action: ActionTypes): InitialStateProfileType => {
	switch (action.type) {

		case 'ADD_POST':
			return {
				...state,
				posts: [...state.posts, {
					id: 2,
					post: action.textOfNewPost,
					count: 0
				}],
			};

		case 'SET_USER_PROFILE': {
			return {
				...state, profile: action.profile
			};
		}

		case 'SET_USER_STATUS': {
			return {
				...state, status: action.status
			};
		}

		case 'TOGGLE_FETCHING': {
			return {
				...state, isFetching: action.isFetching
			};
		}

		case 'SAVE_AVATAR_TO_STATE': {
			return {
        //??--------------------------------------------any-----------------
				...state, profile: { ...state.profile, photos: action.file } as ProfileType 
			};
		}

		case 'TOGGLE_FETCHING_AVATAR': {
			return {
				...state, isAvatarFetching: action.isFetching
			};
		}

		case 'SET_ERROR_MESSAGES': {
			return {
				...state, errorMessages: action.messages
			};
		}

		case 'TOGGLE_EDIT_MODE': {
			return {
				...state, isEditMode: action.isEditMode
			};
		}

		default:
			return state;
	}
}
export const actions = {
	addPostActionCreator: (textOfNewPost: string) => ({ type: 'ADD_POST', textOfNewPost } as const),
	setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
	setUserStatus: (status: string) => ({ type: 'SET_USER_STATUS', status } as const),
	toggleFetching: (isFetching: boolean) => ({ type: 'TOGGLE_FETCHING', isFetching } as const),
	saveAvatarToState: (file: File) => ({ type: 'SAVE_AVATAR_TO_STATE', file } as const),
	toggleFetchingAvatar: (isFetching: boolean) => ({ type: 'TOGGLE_FETCHING_AVATAR', isFetching } as const),
	setErrorMessages: (messages: string[]) => ({ type: 'SET_ERROR_MESSAGES', messages } as const),
	toggleEditMode: (isEditMode: boolean) => ({ type: 'TOGGLE_EDIT_MODE', isEditMode } as const),
}

export const getUserProfile = (userId: number): ThunkAction<void, InitialStateProfileType, null, ActionTypes> => async (dispatch) => {
	try {
		dispatch(actions.toggleFetching(true));
		const response = await profileAPI.getProfile(userId);
		dispatch(actions.toggleFetching(false));
		dispatch(actions.setUserProfile(response.data));
	} catch(error) {
	}
}

export const getUserStatus = (userId: number): ThunkAction<void, InitialStateProfileType, null, ActionTypes> => async (dispatch) => {
	try {
		const response = await profileAPI.getStatus(userId);
		dispatch(actions.setUserStatus(response.data));
		if(response.data.message > 0) {
		}
	} catch (error) {
	}
}

export const updateUserStatus = (status: string): ThunkAction<void, InitialStateProfileType, null, ActionTypes> => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(actions.setUserStatus(status));
	}
}

export const savePhoto = (file: File, config: AxiosRequestConfig): ThunkAction<void, InitialStateProfileType, null, ActionTypes> => async (dispatch) => {
	dispatch(actions.toggleFetchingAvatar(true))
	const response = await profileAPI.saveAvatar(file, config);
	if (response.data.resultCode === 0) {
		dispatch(actions.saveAvatarToState(response.data.data.photos));
	}
	setTimeout(() => dispatch(actions.toggleFetchingAvatar(false)), 1000);
}

export const updateUserSettings = (settings: ProfileType): ThunkAction<void, InitialStateProfileType, null, ActionTypes> => async (dispatch, getState: any) => {
	const userId = getState().auth.id;
	const isEditMode = getState().profilePage.isEditMode;
	dispatch(actions.setErrorMessages([]))
	const response = await profileAPI.updateSettings(settings);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfile(userId));
		dispatch(actions.toggleEditMode(!isEditMode));
	} else {
		dispatch(actions.setErrorMessages(response.data.messages))
	}
}

export default profileReducer;