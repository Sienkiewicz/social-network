import React, { FC } from 'react'
import s from './Users.module.scss'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/icons/icon_developer.jpg'

type Props = {
  user: {
    name: string
    id: number
    photos: {
      small: null | string
      large: null | string
    }
    status: null | string
    followed: boolean
  }
  followingInProgress: number[]

  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const User: FC<Props> = (props) => {
  return (
    <div className={s.wrapper}>
      <NavLink to={`/profile/${props.user.id}`}>
        <div className={s.avatar}>
          <img
            alt=''
            src={
              props.user.photos.small != null
                ? props.user.photos.small
                : userPhoto
            }
            className={s.photoUser}
          />
          <div className={s.userInfo}>
            <span>{props.user.name}</span>
            <br />
            <span>{props.user.status}</span>
          </div>
        </div>
      </NavLink>
      <div className={s.btn}>
        {props.user.followed ? (
          <button
            disabled={props.followingInProgress.some(
              (id: number) => id === props.user.id
            )}
            onClick={() => {
              props.unfollow(props.user.id)
            }}
          >
            unfollow
          </button>
        ) : (
          <button
            disabled={props.followingInProgress.some(
              (id) => id === props.user.id
            )}
            onClick={() => {
              props.follow(props.user.id)
            }}
          >
            follow
          </button>
        )}
      </div>
    </div>
  )
}

export default User
