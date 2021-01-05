import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, FilterType } from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/preloaders/Preloader'
import { AppStateType } from '../../redux/redux-store'
import { useHistory } from 'react-router-dom'

  type QueryParamsType = {
    term?: string
    friend?: string
    page?: string
  }

const UsersContainer: FC = () => {
  const queryString = require('query-string')
  const history = useHistory()
  const pageSize = useSelector(
    (state: AppStateType) => state.usersPage.pageSize
  )
  const isFetching = useSelector(
    (state: AppStateType) => state.usersPage.isFetching
  )
  const currentPage = useSelector(
    (state: AppStateType) => state.usersPage.currentPage
  )
  const totalUsersCount = useSelector(
    (state: AppStateType) => state.usersPage.totalUsersCount
  )
  const users = useSelector((state: AppStateType) => state.usersPage.users)
  const filter = useSelector((state: AppStateType) => state.usersPage.filter)
  const followingInProgress = useSelector(
    (state: AppStateType) => state.usersPage.followingInProgress
  )

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter))
  }
  const dispatch = useDispatch()

useEffect(() => {
const parsed = queryString.parse(history.location.search) as QueryParamsType

let actualPage = currentPage
let actualFilter = filter
if(parsed.page) actualPage = +parsed.page
if(parsed.term) actualFilter = {...actualFilter, term: parsed.term}
if(parsed.friend) actualFilter = {
  ...actualFilter,
  friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false
}
dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}
    if(filter.term) query.term = filter.term
    if(filter.friend !== null) query.friend = String(filter.friend)
    if(currentPage !== 1) query.page = String(currentPage)

    
    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })
  }, [filter, currentPage])

  // useEffect(() => {
  //   dispatch(getUsers(currentPage, pageSize, filter))
  // }, [currentPage, filter])

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        onFilterChanged={onFilterChanged}
        users={users}
        followingInProgress={followingInProgress}
      />
    </>
  )
}

export default UsersContainer
