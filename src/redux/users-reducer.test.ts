import usersReducer, {
  InitialStateUsersType,
  actionsOfUsers,
} from './users-reducer'

let state: InitialStateUsersType

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Piotr 0',
        status: 'status 0',
        photos: { small: null, large: null },
        followed: false,
      },
      {
        id: 1,
        name: 'Piotr 1',
        status: 'status 1',
        photos: { small: null, large: null },
        followed: false,
      },
      {
        id: 2,
        name: 'Piotr 2',
        status: 'status 2',
        photos: { small: null, large: null },
        followed: true,
      },
      {
        id: 3,
        name: 'Piotr 3',
        status: 'status 3',
        photos: { small: null, large: null },
        followed: true,
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  }
})

test('follow success', () => {

  const newState = usersReducer(state, actionsOfUsers.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
})
test('unfollow success', () => {

  const newState = usersReducer(state, actionsOfUsers.unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
})