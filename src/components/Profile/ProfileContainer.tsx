import React, { FC, useEffect } from 'react'
import Profile from './Profile'
import { connect, useDispatch } from 'react-redux'
import {
  actions,
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
} from '../../redux/profile-reducer'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { compose } from 'redux'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../common/preloaders/Preloader'
import PostArea from './PostArea/PostArea'
import { ProfileType } from '../common/Types'
import { AxiosRequestConfig } from 'axios'
import { AppStateType } from '../../redux/redux-store'

type Props = {
  userId: number
  isAvatarFetching: boolean
  isEditMode: boolean
  profile: ProfileType | null
  authId: number | null
  status: string
  isFetching: boolean

  savePhoto: (file: File, config: AxiosRequestConfig) => void
  toggleEditMode: (isEditMode: boolean) => void
  updateUserStatus: (status: string) => void
}

type MatchParamsType = {
  userId: string | undefined
}

const ProfileContainer: FC<Props> = (props) => {
  let match = useRouteMatch<MatchParamsType>('/profile/:userId?')
  const dispatch = useDispatch()

  let userId: number | null = match
    ? match.params.userId
      ? +match.params.userId
      : props.authId
    : props.authId

  useEffect(() => {
    if (userId !== null) {
      dispatch(getUserProfile(userId))
      dispatch(getUserStatus(userId))
    }
  }, [userId])

  // redirect to login
  if (!props.authId) {
    if(!userId) {
      return <Redirect to={'/login'} />
      }
  }
  
  return (
    <>
      {props.isFetching ? <Preloader /> : null}
      {props.profile && userId !== null && (
        <Profile
          {...props}
          isAvatarFetching={props.isAvatarFetching}
          profile={props.profile}
          status={props.status} 
          updateUserStatus={props.updateUserStatus}
          userId={userId}
          savePhoto={props.savePhoto}
        />
      )}

      {match && !match.params.userId && <PostArea />}
      <MyPostsContainer />
    </>
  )
}

let mapStateToProps = (state: AppStateType) => ({
  isAvatarFetching: state.profilePage.isAvatarFetching,
  isFetching: state.profilePage.isFetching,
  profile: state.profilePage.profile,
  authId: state.auth.id,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  isEditMode: state.profilePage.isEditMode,
})

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    toggleEditMode: actions.toggleEditMode,
  })
)(ProfileContainer)
