import React, { FC } from 'react';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import { ProfileType } from '../common/Types';
import { AxiosRequestConfig } from 'axios';

type Props = {
  userId: number
  isAvatarFetching: boolean
  isEditMode: boolean
  profile: ProfileType
  authId: number | null
  status: string

  savePhoto: (file: File, config: AxiosRequestConfig) => void
  toggleEditMode: (isEditMode: boolean) => void
  updateUserStatus: (status: string) => void
}

const Profile: FC<Props> = (props) => {
	
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
