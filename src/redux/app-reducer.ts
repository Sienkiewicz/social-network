import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { AppStateType, InferActionTypes } from "./redux-store";

type ActionTypes = InferActionTypes<typeof actions>
export type InitialStateType = typeof initialState

let initialState = {
	initialized: false,
} 

const appReducer = (state: InitialStateType = initialState, action: ActionTypes ): InitialStateType => {
	switch (action.type) {
		case 'SN/APP/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			};
		default:
			return state; 
	}
}

export const actions = {
	initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const)
}


export const initializeApp = (): ThunkAction<void, AppStateType, null, ActionTypes> => (dispatch: any) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise])
	.then(() => {
			dispatch(actions.initializedSuccess())
		});
}


export default appReducer;