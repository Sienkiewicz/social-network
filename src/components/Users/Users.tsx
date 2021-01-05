import { Field, Form, Formik } from 'formik'
import React, { FC, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { FilterType, follow, unfollow } from '../../redux/users-reducer'
import Pagination from '../common/pagination/Pagination'
import { UserType } from '../common/Types'
import User from './User'

type Props = {
  users: UserType[]
  followingInProgress: number[]
  currentPage: number
  pageSize: number
  totalUsersCount: number

  onPageChanged: (pageNr: number) => void
  onFilterChanged: (term: FilterType) => void
}

const Users: FC<Props> = memo((props) => {
  const dispatch = useDispatch()

  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  }
  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [props.users])
  return (
    <>
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />
      {props.users.map((u) => (
        <User
          key={u.id}
          user={u}
          followingInProgress={props.followingInProgress}
          unfollow={onUnfollow}
          follow={onFollow}
        />
      ))}
      <Pagination
        pageSize={props.pageSize}
        totalUsersCount={props.totalUsersCount}
        onPageChanged={props.onPageChanged}
        currentPage={props.currentPage}
      />
    </>
  )
})
export default Users

type PropsType = {
  onFilterChanged: (term: FilterType) => void
}
type FriendFormType = 'null' | 'true' | 'false'
type FormType = {
  term: string,
  friend: FriendFormType
}

const UsersSearchForm: FC<PropsType> = memo((props) => {
  const filter = useSelector((state: AppStateType) => state.usersPage.filter)

  const onSubmit = (values: FormType) => {
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === 'null'
          ? null
          : values.friend === 'true'
          ? true
          : false,
    }
    props.onFilterChanged(filter)
  }
  return (
    <Formik 
    enableReinitialize
    initialValues={{ term: filter.term , friend: String(filter.friend) as FriendFormType}} onSubmit={onSubmit}>
      {() => (
        <Form>
          <Field type='text' name='term' />
          <Field name='friend' as='select'>
            <option value='null'>All</option>
            <option value='true'>Only followed</option>
            <option value='false'>Only unfollowed</option>
          </Field>
          <button type='submit'>Find</button>
        </Form>
      )}
    </Formik>
  )
})
