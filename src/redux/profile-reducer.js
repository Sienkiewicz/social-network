
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

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
	newPostText: '',
	profile: null
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {

		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, {
					id: '2',
					post: state.newPostText,
					count: 0
				}],
				newPostText: ''
			};

		case UPDATE_NEW_POST_TEXT: {
			return {
				...state, newPostText: action.newText
			};
		}

		case SET_USER_PROFILE: {
			return {
				...state, profile: action.profile
			};
		}
		
		default:
			return state;
	}
}

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export default profileReducer;