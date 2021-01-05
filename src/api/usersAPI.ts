import { GetItemsType, instance, APIResponseType } from './api'

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10, term = '', friend= null as null | boolean) {
    const response = await instance.get<GetItemsType>(
      `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)
    )
    return response.data
  },

  async follow(userId: number) {
    const response = await instance.post<APIResponseType>(`follow/${userId}`, {})
    return response.data
  },

  async unfollow(userId: number) {
    const response = await instance.delete(`follow/${userId}`, {})
    return response.data as Promise<APIResponseType>
  }
};
