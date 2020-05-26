import React from 'react';
import s from './Users.module.scss';
import * as Axios from 'axios';
import userPhoto from '../../assets/icons/icon_developer.jpg';

class Users extends React.Component {

 getUsers = () => {
    if (this.props.users.length === 0) {
      Axios.get('https://social-network.samuraijs.com/api/1.0/users').then(
        (response) => {
          //? response это просто слово, может быть все что угодно
          this.props.setUsers(response.data.items); //* адрес нашли, когда вызвали дебаггер строчкой выше и посмотрели что пришло в response
        }
      );
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.getUsers}>Get Users</button>
        {this.props.users.map((u) => (
          <div key={u.id}>
            <div className={s.avatar}>
              <img
                src={u.photos.small != null ? u.photos.small : userPhoto}
                className={s.photoUser}
              />

              {u.followed ? (
                <button
                  onClick={() => {
                    this.props.unfollow(u.id);
                  }}
                  className={s.btn}
                >
                  unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    this.props.follow(u.id);
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
  }
}

export default Users;
