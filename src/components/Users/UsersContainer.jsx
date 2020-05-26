import React from 'react';
import Users from './UsersC';
import { connect } from 'react-redux';
import {
  followActionCreator,
  setUsersActionCreator,
  unfollowActionCreator,
} from '../../redux/users-reducer';

let mapStateToProps = (state) => {

	
  return {
    users: state.usersPage.users,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
		dispatch(followActionCreator(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowActionCreator(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersActionCreator(users));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;

// * от костанты до экспорт дэфолт можно записать одной строкой
// ? export default connect((mapStateToProps, mapDispatchToProps)(Users)
