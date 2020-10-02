import { usersAPI } from "../api/api";
import { updateObjInArray } from "../utils/object-helpers";

const FOLLOW = 'soc/users/FOLLOW';
const UNFOLLOW = 'soc/users/UNFOLLOW';
const SET_USERS = 'soc/users/SET_USERS';
const SET_CURRENT_PAGE = 'soc/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'soc/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'soc/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'soc/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
	users: [],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
}


const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjInArray(state.users, 'id', action.userId, { followed: true })
			};
		case UNFOLLOW:
			return {
				...state,
				users: updateObjInArray(state.users, 'id', action.userId, { followed: false })	
			};
		case SET_USERS:
			return {
				...state, users: action.users
			};

		case SET_CURRENT_PAGE:
			return {
				...state, currentPage: action.currentPage
			};

		case SET_TOTAL_USERS_COUNT:
			return {
				...state, totalUsersCount: action.totalUsersCount
			}

		case TOGGLE_IS_FETCHING:
			return {
				...state, isFetching: action.isFetching
			}

		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}


		default:
			return state;
	}
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

//? THUNK CREATORS

export const getUsers = (currentPage, pageSize) => {
	return async (dispatch) => {
		dispatch(setCurrentPage(currentPage));
		dispatch(toggleIsFetching(true));

		const data = await usersAPI.getUsers(currentPage, pageSize);
		
		dispatch(toggleIsFetching(false));
		dispatch(setUsers(data.items)); //* адрес нашли, когда вызвали дебаггер строчкой выше и посмотрели что пришло в response
		dispatch(setTotalUsersCount(data.totalCount));
	}
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));
	const data = await apiMethod;
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
}

export const unfollow = (userId) => {
	return async (dispatch) => {

		followUnfollowFlow(dispatch, userId, usersAPI.unfollow(userId), unfollowSuccess)
	}
}

export const follow = (userId) => {
	return async (dispatch) => {

		followUnfollowFlow(dispatch, userId, usersAPI.follow(userId), followSuccess)
	}
}


export default usersReducer;