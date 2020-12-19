import React from 'react';
import { connect } from 'react-redux';
import {
    follow,
    unfollow,
    getUsers,
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/preloaders/Preloader';
import { AppStateType } from '../../redux/redux-store';
import { UserType } from '../common/Types'

class UsersAPIComponent extends React.Component<
  MapDispatchPropsType & MapStatePropsType
> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    )
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
};

const UsersContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    getUsers,
})(UsersAPIComponent);

export default UsersContainer;

// * от костанты до экспорт дэфолт можно записать одной строкой
// ? export default connect((mapStateToProps, mapDispatchToProps)(Users)

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: UserType[]
  followingInProgress: number[]
}

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}
