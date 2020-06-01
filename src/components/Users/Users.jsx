import React from 'react';
import s from './Users.module.scss';
import userPhoto from '../../assets/icons/icon_developer.jpg';
import { NavLink } from 'react-router-dom';

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <span
              className={props.currentPage === p && s.selectedPage}
              onClick={() => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map((u) => (
        <div key={u.id}>
          <div className={s.avatar}>
            <NavLink to={`/profile/${u.id}`}>
              <img
                src={u.photos.small != null ? u.photos.small : userPhoto}
                className={s.photoUser}
              />
            </NavLink>

            {u.followed ? (
              <button
                disabled={props.followingInProgress.some((id) => id === u.id)}
                onClick={() => {
                  props.unfollow(u.id);
                }}
                className={s.btn}
              >
                unfollow
              </button>
            ) : (
              <button
                disabled={props.followingInProgress.some((id) => id === u.id)}
                onClick={() => {
                  props.follow(u.id);
                }}
                className={s.btn}
              >
                follow
              </button>
            )}
          </div>
          <div className={s.userinfo}>
            <div>
              <span>{u.name}</span>
              <br />
              <span>{u.status}</span>
            </div>
            <div>
              <span>'u.location.city'</span>
              <br />
              <span>'u.location.country'</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
