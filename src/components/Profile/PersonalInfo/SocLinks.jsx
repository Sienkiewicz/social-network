import React from 'react'
import { useSelector } from 'react-redux';
import s from './PersonalInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFacebook,
	faInstagram,
	faVk,
	faTwitter,
	faYoutube,
	faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faLink } from '@fortawesome/free-solid-svg-icons'

const Contact = ({ contactTitle, contactValue }) => {

	const socialNetwork = {
		facebook: <FontAwesomeIcon size='2x' icon={faFacebook}/>,
		website: <FontAwesomeIcon className='fa-2x' icon={faGlobe} />,
		vk: <FontAwesomeIcon className='fa-2x' icon={faVk} />,
		twitter: <FontAwesomeIcon className='fa-2x' icon={faTwitter} />,
		instagram: <FontAwesomeIcon className='fa-2x' icon={faInstagram} />,
		youtube: <FontAwesomeIcon className='fa-2x' icon={faYoutube} />,
		github: <FontAwesomeIcon className='fa-2x' icon={faGithub} />,
		mainLink: <FontAwesomeIcon className='fa-2x' icon={faLink} />,
	}

	return <div>
		<a href={contactValue}>{socialNetwork[Object.keys(socialNetwork).find(title => title.includes(contactTitle))]}</a>
	</div>
}

const SocLinks = () => {
	const profile = useSelector(state => state.profilePage.profile)
	return (
		<div className={s.socLinks}>
			{Object.keys(profile.contacts).map(key => {
				return (
					!!profile.contacts[key] && <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
				)
			})}
		</div>
	)
}

export default SocLinks
