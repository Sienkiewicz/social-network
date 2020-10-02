import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../common/pagination/Pagination';
import User from './User';



let Users = (props) => {
	const users = useSelector(state => state.usersPage.users)

	return (
		<div >
			{props.users.map((u) =>
				<User
					key={u.id}
					user={u}
					followingInProgress={props.followingInProgress}
					unfollow={props.unfollow}
					follow={props.follow}
				/>)}
			<Pagination
				pageSize={props.pageSize}
				totalUsersCount={props.totalUsersCount}
				onPageChanged={props.onPageChanged}
				currentPage={props.currentPage}
			/>
		</div>
	);
};

export default Users;
