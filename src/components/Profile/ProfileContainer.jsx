import React, { useEffect } from 'react';
import Profile from './Profile';
import { connect, useDispatch } from 'react-redux';
import {
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	savePhoto,
	toggleEditMode,
} from '../../redux/profile-reducer';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { compose } from 'redux';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/preloader/Preloader';
import PostArea from './PostArea/PostArea';

// First iteration


const ProfileContainer = (props) => {
	let match = useRouteMatch('/profile/:userId?')
	const dispatch = useDispatch()

	let userId = match.params.userId;

	if (!userId) {
		userId = props.authId;
	}

	useEffect(() => {
		dispatch(getUserProfile(userId));
		dispatch(getUserStatus(userId));
	}, [dispatch, userId])

	// redirect to login
	if (!props.isAuth) {
		let userId = match.params.userId;
		if (!userId) {
			return <Redirect to={'/login'} />
		}
	}

	return (
		<>
			{props.isFetching ? <Preloader /> : null}
			<Profile
				{...props}
				isAvatarFetching={props.isAvatarFetching}
				profile={props.profile}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
				userId={match.params.userId}
				savePhoto={props.savePhoto}
			/>
			{!match.params.userId &&
				<PostArea />
			}
			<MyPostsContainer />

		</>
	);
}

let mapStateToProps = (state) => ({
	isAvatarFetching: state.profilePage.isAvatarFetching,
	isFetching: state.profilePage.isFetching,
	profile: state.profilePage.profile,
	authId: state.auth.id,
	status: state.profilePage.status,
	isAuth: state.auth.isAuth,
	isEditMode: state.profilePage.isEditMode,
});


export default compose(
	connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, toggleEditMode }),
)(ProfileContainer);
