import { createStore, combineReducers, applyMiddleware } from "redux"
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

type AppStateType = ReturnType<typeof reducers>

type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any} > = ReturnType<PropertiesTypes<T>>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store


export default store