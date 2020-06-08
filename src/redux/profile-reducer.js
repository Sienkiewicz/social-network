import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

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

		default:
			return state;
	}
}

export const addPostActionCreator = (textOfNewPost) => ({ type: ADD_POST, textOfNewPost });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });


export const getUserProfile = (userId) => (dispatch) => {
	usersAPI.getProfile(userId).then(
		(response) => {
			dispatch(setUserProfile(response.data));
		}
	);
}

export const getUserStatus = (userId) => (dispatch) => {
	profileAPI.getStatus(userId).then(
		(response) => {
			dispatch(setUserStatus(response.data));
		}
	);
}

export const updateUserStatus = (status) => (dispatch) => {
	profileAPI.updateStatus(status).then(
		(response) => {
			if (response.data.resultCode === 0) {
				dispatch(setUserStatus(status));
			}

		}
	);
}




export default profileReducer;