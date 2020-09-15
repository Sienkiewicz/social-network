import Axios from "axios";

const instance = Axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'cf94d687-3042-41e9-81ee-b19cbfbf0014',
	},
})

export const usersAPI = {
	async getUsers(currentPage = 1, pageSize = 10) {

		const response = await instance.get(
			`users?page=${ currentPage }&count=${ pageSize }`);
		return response.data;
		
	},

	async follow(userId) {
		const response = await instance.post(
			`follow/${ userId }`,
			{});
		return response.data;
	},

	async unfollow(userId) {
		const response = await instance.delete(
			`follow/${ userId }`,
			{});
		return response.data;
	},

	getProfile(userId) {
		console.warn('Absolute method. Please use profileAPI object')
		return profileAPI.getProfile(userId)
	}

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

export const profileAPI = {
	getProfile(userId) {
		return instance.get(`profile/${ userId }`)
	},

	getStatus(userId) {
		return instance.get(`profile/status/${ userId }`)
	},

	updateStatus(status) {
		return instance.put(`profile/status`, { status })
	}
}



export const authAPI = {
	me() {
		return instance.get(`auth/me`)
	},

	login(email, password, rememberMe = false) {
		return instance.post(`auth/login`, {
			email, password, rememberMe
		})
	},

	logout() {
		return instance.delete(`auth/login`)
	}
}

