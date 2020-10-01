import React from 'react';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import PersonalInfo from './PersonalInfo/PersonalInfo';

// First iteration

const Profile = (props) => {
	
	return (
		<div>
			<PersonalInfo
				userId={props.userId}
				isAvatarFetching={props.isAvatarFetching}
				savePhoto={props.savePhoto}
				isEditMode={props.isEditMode}
				profile={props.profile}
				toggleEditMode={props.toggleEditMode}
				authId={props.authId}
			/>
			<ProfileStatus
				authId={props.authId}
				userId={props.userId}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
			/>
		</div>
	);
};

export default Profile;
