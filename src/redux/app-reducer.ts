import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { InferActionTypes } from "./redux-store";

type ActionTypes = InferActionTypes<typeof actions>
export type InitialStateType = typeof initialState

let initialState = {
	initialized: false,
} 

const appReducer = (state: InitialStateType = initialState, action: ActionTypes ): InitialStateType => {
	switch (action.type) {
		case 'INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			};
		default:
			return state; 
	}
}

export const actions = {
	initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}


export const initializeApp = (): ThunkAction<void, InitialStateType, null, ActionTypes> => (dispatch: any) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise])
	.then(() => {
			dispatch(actions.initializedSuccess())
		});
}


export default appReducer;