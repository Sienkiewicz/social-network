import Axios from "axios";



const instance = Axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'cf94d687-3042-41e9-81ee-b19cbfbf0014',
	},
})

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {

		return instance.get(
			`users?page=${ currentPage }&count=${ pageSize }`)
			.then(response => response.data) //* это одно и тоже что написать 
		//* (responce => {return response.data;})

	},

	follow(userId) {
		return instance.post(
			`follow/${ userId }`,
			{},
		).then(response => response.data);
	},
	
	unfollow(userId) {
		return instance.delete(
			`follow/${ userId }`,
			{},
		).then(response => response.data);
	},

}


// *export const followUsers = (userId) => {

//* 	return instance.post(
//* 		`follow/${ userId }`,
//* 		{},
//* 	).then(response => response.data);

//* }

//* export const unfollowUsers = (userId) => {

//* 	return instance.delete(
//* 		`follow/${ userId }`,
//* 		{},
//* 	).then(response => response.data);

//* }



