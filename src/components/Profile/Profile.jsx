import React from 'react';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import PersonalInfo from './PersonalInfo/PersonalInfo';

// First iteration

const Profile = (props) => {
	return (
		<div>
			<PersonalInfo profile={props.profile} />
			<ProfileStatus
				userId={props.userId}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
			/>
		</div>
	);
};

export default Profile;
