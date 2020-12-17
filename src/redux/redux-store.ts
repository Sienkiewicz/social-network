import { ThunkAction } from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, Action } from "redux"
import profileReducer from "./profile-reducer"
import messagesReducer from "./messages-reducer"
import sidebarReducer from "./sidebar-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"

let reducers = combineReducers({
	profilePage: profileReducer, 
	messagesPage: messagesReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
})

export type AppStateType = ReturnType<typeof reducers>

export type InferActionTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseTThunk<A extends Action, R=Promise<void>> = ThunkAction<R, AppStateType, null, A>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store


export default store