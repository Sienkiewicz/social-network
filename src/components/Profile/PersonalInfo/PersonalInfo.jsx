import React from 'react';
import s from './PersonalInfo.module.scss';
import Preloader from '../../common/preloader/Preloader';
import userPhoto from '../../../assets/icons/icon_developer.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import AboutMe from './AboutMe';
import SettingsFields from './SettingsFields';
import SocLinks from './SocLinks';


class PersonalInfo extends React.Component {
	state = {
		uploadPercentage: 0,
		editMode: false,
	}

	config = {
		onUploadProgress: progressEvent => {
			this.setState({
				uploadPercentage: parseInt(Math.round(progressEvent.loaded / progressEvent.total * 100))
			})
				;
		}
	}

	fileSelectedHandler = e => {
		e.preventDefault();
		if (e.target.files.length) {
			this.props.savePhoto(e.target.files[0], this.config);
		}
	}

	render() {

		const myStyleDivPercentage = {
			background: 'rgba(0,153,153, 0.7)',
			position: 'absolute',
			height: `${ this.state.uploadPercentage }%`,
			width: '100%',
			bottom: '0',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			transition: '0.2s',
			color: 'white',
		}

		// const myStylePPercentage ={
		// 	display: 'inlineBlock',
		// 	verticalAlign: 'middle',
		// }

		if (!this.props.profile) {
			return <Preloader />;
		}

		return (
			<div>
				<div className={s.persInfo}>
					<div className={s.avatar}>
						<img
							// className={s.avatar}
							src={this.props.profile.photos.large || userPhoto}
							alt=''
						/>
						{+this.props.userId === this.props.authId && <div
							onClick={() => this.fileInput.click()}
							className={s.input}
						>
							<p>CHANGE AVATAR</p>
							<input
								type="file"
								onChange={this.fileSelectedHandler}
								ref={fileInput => this.fileInput = fileInput}
							/>
						</div>}
						{this.props.isAvatarFetching &&
							<div
								style={myStyleDivPercentage}
							>
								`{this.state.uploadPercentage}%`
						</div>
						}

					</div>
					<div className={s.containerInfo}>
						<h2>
							{this.props.profile.fullName} {+this.props.userId === this.props.authId && <div> <FontAwesomeIcon
								className={s.settings}
								icon={faCog}
								onClick={() => this.props.toggleEditMode(!this.props.isEditMode)}
							/>
							</div>}
						</h2>
						<AboutMe profile={this.props.profile} />
					</div>
					{this.props.isEditMode && <SettingsFields />}
				</div>
				<SocLinks />
			</div>
		);
	}
}


// const PersonalInfo = (props) => {
// 	if (!props.profile) {
// 		return <Preloader />;
// 	}

// 	const changeAvatar = () => {
// 		console.log(changeAvatar);
// 	}

// 	return (
// 		<div>
// 			<div className={s.persInfo}>
// 				<div className={s.avatar}>
// 					<img
// 						// className={s.avatar}
// 						src={props.profile.photos.large || userPhoto}
// 						alt=''
// 					/>
// 				</div>
// 				<div>
// 					<h1> {props.profile.fullName} </h1>
// 					<ul>
// 						<li className={s.item}>
// 							Looking for a job? {props.profile.lookingForAJobDescription}
// 						</li>
// 						<li>City: Wroclaw</li>
// 						<li>Education: UkrDLTU</li>
// 						<li>
// 							Instagram:{' '}
// 							<a target='blank' href={props.profile.contacts.instagram}>
// 								{props.profile.contacts.instagram}
// 							</a>
//               /
//             </li>
// 					</ul>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

export default PersonalInfo;
