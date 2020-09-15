import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';

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

		default:
			return state;
	}
}

export const addPostActionCreator = (textOfNewPost) => ({ type: ADD_POST, textOfNewPost });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const toggleFetching = (isFetching) => ({ type: TOGGLE_FETCHING, isFetching });


export const getUserProfile = (userId) => async (dispatch) => {
	// initialState.isFetching = true;
	dispatch(toggleFetching(true));
	const response = await profileAPI.getProfile(userId);
	dispatch(toggleFetching(false));
	dispatch(setUserProfile(response.data));
}

export const getUserStatus = (userId) => async (dispatch) => {
	const response = await profileAPI.getStatus(userId);
	dispatch(setUserStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
}

export default profileReducer;