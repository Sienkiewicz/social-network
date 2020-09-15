import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
	getUserProfile,
	getUserStatus,
	updateUserStatus,
} from '../../redux/profile-reducer';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/preloader/Preloader';
import PostArea from './PostArea/PostArea';

// First iteration

class ProfileContainer extends React.Component {
	refreshProfile() {
		let userId = this.props.match.params.userId;
		if (!userId) {
			userId = this.props.authId;
		}
		this.props.getUserProfile(userId);
		this.props.getUserStatus(userId);
	}
	
	componentDidMount() {
		this.refreshProfile();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile();
		}
	}

	render() {

		if (!this.props.isAuth) {
			let userId = this.props.match.params.userId;
			if (!userId) {
				return <Redirect to={'/login'} />
			}
		}

		return (
			<>
				{this.props.isFetching ? <Preloader /> : null}
				<Profile
					{...this.props}
					profile={this.props.profile}
					status={this.props.status}
					updateUserStatus={this.props.updateUserStatus}
					userId={this.props.match.params.userId}
				/>
				{!this.props.match.params.userId &&
					<PostArea />
				}
				<MyPostsContainer />

			</>
		);
	}
}

let mapStateToProps = (state) => ({
	isFetching: state.profilePage.isFetching,
	profile: state.profilePage.profile,
	authId: state.auth.id,
	status: state.profilePage.status,
	isAuth: state.auth.isAuth,
});

// let withUrlDataContainerComponent = withRouter(ProfileContainer);

// export default connect(mapStateToProps, { getUserProfile })(
//   withUrlDataContainerComponent
// );

export default compose(
	connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
	withRouter,
)(ProfileContainer);
