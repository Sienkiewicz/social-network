import { createStore, combineReducers } from "redux";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebar-reducer";

let reducers = combineReducers({
	profilePage: profileReducer, //*? можно записать так и так, как ниже 
	messagesPage: messagesReducer,						//*? это одно и то же
	sidebar: sidebarReducer
})

let store = createStore(reducers);

export default store;