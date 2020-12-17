import React, { FC } from 'react'
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
import { AppStateType } from '../../../redux/redux-store';
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type Props = {
  contactTitle: string
  contactValue: string
}

const Contact: FC<Props> = ({ contactTitle, contactValue }) => {

	const socialNetwork: {[key: string]: any} = {
    facebook: <FontAwesomeIcon size='2x' icon={faFacebook as IconProp} />,
    website: <FontAwesomeIcon className='fa-2x' icon={faGlobe} />,
    vk: <FontAwesomeIcon className='fa-2x' icon={faVk as IconProp} />,
    twitter: <FontAwesomeIcon className='fa-2x' icon={faTwitter as IconProp} />,
    instagram: <FontAwesomeIcon className='fa-2x' icon={faInstagram as IconProp} />,
    youtube: <FontAwesomeIcon className='fa-2x' icon={faYoutube as IconProp} />,
    github: <FontAwesomeIcon className='fa-2x' icon={faGithub as IconProp} />,
    mainLink: <FontAwesomeIcon className='fa-2x' icon={faLink} />,
  }

  const index = Object.keys(socialNetwork).find((title) =>
    title.includes(contactTitle)
  )

	return <div>
		<a href={contactValue}>{index !== undefined && socialNetwork[index]}</a>
	</div>
}

const SocLinks = () => {
	const profile = useSelector((state: AppStateType) => state.profilePage.profile)
	return (
		<div className={s.socLinks}>
			{profile && Object.keys(profile.contacts).map(key => {
				return (
					!!profile.contacts[key] && <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
				)
			})}
		</div>
	)
}

export default SocLinks
