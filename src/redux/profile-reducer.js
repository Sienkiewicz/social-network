import { profileAPI } from "../api/api";

const ADD_POST = 'soc/profile/ADD-POST';
const SET_USER_PROFILE = 'soc/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'soc/profile/SET_USER_STATUS';
const TOGGLE_FETCHING = 'soc/profile/TOGGLE_FETCHING';
const SAVE_AVATAR_TO_STATE = 'soc/profile/SAVE_AVATAR_TO_STATE';
const TOGGLE_FETCHING_AVATAR = 'soc/profile/TOGGLE_FETCHING_AVATAR';
const SET_ERROR_MESSAGES = 'soc/profile/SET_ERROR_MESSAGES';
const TOGGLE_EDIT_MODE = 'soc/profile/TOGGLE_EDIT_MODE';


let initialState = {
	posts: [
		{
			id: '0',
			post:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, obcaecati. Voluptas ut non earum voluptates quidem quam odit est numquam deleniti veniam, enim consequuntur corporis, quibusdam dolorem, incidunt repellat corrupti alias officiis aspernatur cumque voluptate! Libero sint quis voluptate beatae, dolor hic quibusdam sed enim cupiditate doloremque perferendis ullam voluptas.',
			count: '10',
		},
		{
			id: '1',
			post: 'Hi there',
			count: '15',
		},
	],
	profile: null,
	status: '',
	isFetching: false,
	isAvatarFetching: false,
	errorMessages: [],
	isEditMode: false,
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {

		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, {
					id: '2',
					post: action.textOfNewPost,
					count: 0
				}],
			};

		case SET_USER_PROFILE: {
			return {
				...state, profile: action.profile
			};
		}

		case SET_USER_STATUS: {
			return {
				...state, status: action.status
			};
		}

		case TOGGLE_FETCHING: {
			return {
				...state, isFetching: action.isFetching
			};
		}

		case SAVE_AVATAR_TO_STATE: {
			return {
				...state, profile: { ...state.profile, photos: action.file }
			};
		}

		case TOGGLE_FETCHING_AVATAR: {
			return {
				...state, isAvatarFetching: action.isFetching
			};
		}

		case SET_ERROR_MESSAGES: {
			return {
				...state, errorMessages: action.messages
			};
		}

		case TOGGLE_EDIT_MODE: {
			return {
				...state, isEditMode: action.isEditMode
			};
		}

		default:
			return state;
	}
}

export const addPostActionCreator = (textOfNewPost) => ({ type: ADD_POST, textOfNewPost });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const toggleFetching = (isFetching) => ({ type: TOGGLE_FETCHING, isFetching });
export const saveAvatarToState = (file) => ({ type: SAVE_AVATAR_TO_STATE, file });
export const toggleFetchingAvatar = (isFetching) => ({ type: TOGGLE_FETCHING_AVATAR, isFetching });
export const setErrorMessages = (messages) => ({ type: SET_ERROR_MESSAGES, messages });
export const toggleEditMode = (isEditMode) => ({ type: TOGGLE_EDIT_MODE, isEditMode });




export const getUserProfile = (userId) => async (dispatch) => {
	try {
		dispatch(toggleFetching(true));
		const response = await profileAPI.getProfile(userId);
		dispatch(toggleFetching(false));
		dispatch(setUserProfile(response.data));
	} catch(error) {
	}
}

export const getUserStatus = (userId) => async (dispatch) => {
	try {
		const response = await profileAPI.getStatus(userId);
		dispatch(setUserStatus(response.data));

		if(response.data.message > 0) {

		}
	} catch (error) {

	}
}

export const updateUserStatus = (status) => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
}

export const savePhoto = (file, config) => async (dispatch) => {
	dispatch(toggleFetchingAvatar(true))
	const response = await profileAPI.saveAvatar(file, config);
	if (response.data.resultCode === 0) {
		dispatch(saveAvatarToState(response.data.data.photos));
	}
	setTimeout(() => dispatch(toggleFetchingAvatar(false)), 1000);
}

export const updateUserSettings = (settings) => async (dispatch, getState) => {
	const userId = getState().auth.id;
	const isEditMode = getState().profilePage.isEditMode;
	dispatch(setErrorMessages([]))
	const response = await profileAPI.updateSettings(settings);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfile(userId));
		dispatch(toggleEditMode(!isEditMode));
	} else {
		dispatch(setErrorMessages(response.data.messages))
	}
}

export default profileReducer;