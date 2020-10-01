import React from 'react'
import s from './PersonalInfo.module.scss';
import { useSelector } from 'react-redux';



const AboutMe = () => {
	const profile = useSelector(state => state.profilePage.profile)
	return (
		<div>
			<ul>
				<li className={s.item}>
					Am I looking for a job?: {profile.lookingForAJob ? 'YES' : 'NO'}
				</li>
				<li>My professional skills: {profile.lookingForAJobDescription}</li>
			</ul>

		</div>
	)
}



export default AboutMe
