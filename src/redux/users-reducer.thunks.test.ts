import { APIResponseType, ResultCodesEnum } from './../api/api'
import { usersAPI } from '../api/usersAPI'
import { follow, actionsOfUsers, unfollow } from './users-reducer'

jest.mock('../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  usersAPIMock.follow.mockClear()
  usersAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
}
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('follow thunk is working', async () => {
  const thunk = follow(1)

  await thunk(dispatchMock, getStateMock, {})
  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actionsOfUsers.toggleFollowingProgress(true, 1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    2,
    actionsOfUsers.followSuccess(1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actionsOfUsers.toggleFollowingProgress(false, 1)
  )
})

test('unfollow thunk is working', async () => {
  const thunk = unfollow(1)

  await thunk(dispatchMock, getStateMock, {})
  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actionsOfUsers.toggleFollowingProgress(true, 1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    2,
    actionsOfUsers.unfollowSuccess(1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actionsOfUsers.toggleFollowingProgress(false, 1)
  )
})
