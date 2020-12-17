import React, { FC } from 'react'
import s from './PersonalInfo.module.scss';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';



const AboutMe: FC = () => {
	const profile = useSelector((state: AppStateType)  => state.profilePage.profile)
	return (
		<div>
			<ul>
				<li className={s.item}>
					Am I looking for a job?: {profile && profile.lookingForAJob ? 'YES' : 'NO'}
				</li>
				<li>My professional skills: {profile && profile.lookingForAJobDescription}</li>
			</ul>

		</div>
	)
}



export default AboutMe
