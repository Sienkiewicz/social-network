import { ThunkAction } from 'redux-thunk';
import { UserType } from './../components/common/Types';
import { InferActionTypes } from './redux-store';
import { usersAPI } from "../api/api";
import { updateObjInArray } from "../utils/object-helpers";

type ActionTypes = InferActionTypes<typeof actionsOfUsers>
export type InitialStateUsersType = typeof initialState

let initialState = {
	users: [] as UserType[],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as number[] //array of users ids
}


const usersReducer = (state: InitialStateUsersType = initialState, action: ActionTypes) => {
	switch (action.type) {
		case 'FOLLOW':
			return {
				...state,
				users: updateObjInArray(state.users, 'id', action.userId, { followed: true })
			};
		case 'UNFOLLOW':
			return {
				...state,
				users: updateObjInArray(state.users, 'id', action.userId, { followed: false })	
			};
		case 'SET_USERS':
			return {
				...state, users: action.users
			};

		case 'SET_CURRENT_PAGE':
			return {
				...state, currentPage: action.currentPage
			};

		case 'SET_TOTAL_USERS_COUNT':
			return {
				...state, totalUsersCount: action.totalUsersCount
			}

		case 'TOGGLE_IS_FETCHING':
			return {
				...state, isFetching: action.isFetching
			}

		case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actionsOfUsers = {
	followSuccess: (userId: number) => ({ type: 'FOLLOW', userId }as const),
	unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId }as const),
	setUsers: (users: UserType[]) => ({ type: 'SET_USERS', users }as const),
	setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage }as const),
	setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount }as const),
	toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching }as const),
	toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId }as const),
}

export const getUsers = (currentPage: number, pageSize: number): ThunkAction<void, InitialStateUsersType, null, ActionTypes> => {
	return async (dispatch) => {
		dispatch(actionsOfUsers.setCurrentPage(currentPage));
		dispatch(actionsOfUsers.toggleIsFetching(true));
		const data = await usersAPI.getUsers(currentPage, pageSize);
		dispatch(actionsOfUsers.toggleIsFetching(false));
		dispatch(actionsOfUsers.setUsers(data.items));
		dispatch(actionsOfUsers.setTotalUsersCount(data.totalCount));
	}
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
	dispatch(actionsOfUsers.toggleFollowingProgress(true, userId));
	const data = await apiMethod;
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(actionsOfUsers.toggleFollowingProgress(false, userId));
}

export const unfollow = (userId: number): ThunkAction<void, InitialStateUsersType, null, ActionTypes> => {
	return async (dispatch) => {
        const unfollowSuccess = actionsOfUsers.unfollowSuccess
		followUnfollowFlow(dispatch, userId, usersAPI.unfollow(userId), unfollowSuccess)
	}
}

export const follow = (userId: number): ThunkAction<void, InitialStateUsersType, null, ActionTypes> => {
	return async (dispatch) => {
        const followSuccess = actionsOfUsers.followSuccess
		followUnfollowFlow(dispatch, userId, usersAPI.follow(userId), followSuccess)
	}
}


export default usersReducer;