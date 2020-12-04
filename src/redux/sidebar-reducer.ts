import { InferActionTypes } from './redux-store';

type ActionTypes = InferActionTypes<typeof actions>
export type InitialStateSidebarType = typeof initialState

let initialState = {};

const sidebarReducer = (state: InitialStateSidebarType = initialState, action: ActionTypes) => {

	return state;
}

export const actions = {

}

export default sidebarReducer;