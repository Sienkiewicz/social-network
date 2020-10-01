import React from 'react'
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import s from './PersonalInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { updateUserSettings, setErrorMessages, toggleEditMode } from '../../../redux/profile-reducer';
import { useState, useEffect } from 'react';
import StandardField from '../../common/FormsControl/StandardField';
import * as Yup from 'yup';



const SettingsFields = ({ closeTab }) => {
	const errorMessages = useSelector(state => state.profilePage.errorMessages)
	const contacts = useSelector(state => state.profilePage.profile.contacts)
	const profile = useSelector(state => state.profilePage.profile)
	const isEditMode = useSelector(state => state.profilePage.isEditMode)
	const dispatch = useDispatch()

	// LOCAL STATE
	const [error, setError] = useState([])
	const [doesShowErrorButtons, setDoesShowErrorButtons] = useState(false)

	useEffect(() => {
		setError(errorMessages);
	}, [errorMessages])
	useEffect(() => {
		showErrorButton(error)
	}, [error])

	const showErrorButton = (error) => {
		error.length > 0 && setDoesShowErrorButtons(true)
	}

	const updateProfile = values => {
		dispatch(updateUserSettings(values))
	}

	const formik = useFormik({
		initialValues: {
			aboutMe: profile.aboutMe ? profile.aboutMe : '',
			lookingForAJob: false,
			lookingForAJobDescription: profile.lookingForAJobDescription ? profile.lookingForAJobDescription : '',
			fullName: profile.fullName ? profile.fullName : '',
			contacts: {
				github: contacts.github ? contacts.github : '',
				vk: contacts.vk ? contacts.vk : '',
				facebook: contacts.facebook ? contacts.facebook : '',
				instagram: contacts.instagram ? contacts.instagram : '',
				twitter: contacts.twitter ? contacts.twitter : '',
				website: contacts.website ? contacts.website : '',
				youtube: contacts.youtube ? contacts.youtube : '',
				mainLink: contacts.mainLink ? contacts.mainLink : '',
			}
		}, validationSchema: Yup.object({
			aboutMe: Yup.string()
				.max(300, 'Must be 300 characters or less')
				.required('Required'),
			lookingForAJobDescription: Yup.string()
				.max(300, 'Must be 300 characters or less')
				.required('Required'),
			fullName: Yup.string().required('Required'),
			contacts: Yup.object().shape({
				github: Yup.string().url('Invalid url format'),
				vk: Yup.string().url('Invalid url format'),
				facebook: Yup.string().url('Invalid url format'),
				instagram: Yup.string().url('Invalid url format'),
				twitter: Yup.string().url('Invalid url format'),
				website: Yup.string().url('Invalid url format'),
				youtube: Yup.string().url('Invalid url format'),
				mainLink: Yup.string().url('Invalid url format'),
			})
		}),
		onSubmit: values => {
			updateProfile(values);
		},
	});

	// HANDLERS
	const handlerCloseTab = () => {
		dispatch(setErrorMessages([]));
		dispatch(toggleEditMode(!isEditMode));
	}
	const handlerChange = (e) => {
		formik.handleChange(e);
		setDoesShowErrorButtons(false);
	}

	return (
		<form
			className={s.overlaySettingsField}
			onSubmit={formik.handleSubmit}
		>
			{error.length > 0 && <div>ERROR</div>}
			<FontAwesomeIcon
				className={s.closeTabContainer}
				icon={faTimes}
				onClick={handlerCloseTab}
			/>
			<div className={s.overlayContent}>
				<StandardField
					nameOfField='fullName'
					nameOfError='fullName'
					textOfLabelField='Full name'
					typeOfField='text'
					handleChange={handlerChange}
					valueOfField={formik.values.fullName}
					onBlur={formik.handleBlur}
					error={error}
					formik={formik}
				/>
				<StandardField
					nameOfField='lookingForAJob'
					nameOfError='lookingForAJob'
					textOfLabelField='Are you looking for a job?'
					typeOfField='checkbox'
					handleChange={handlerChange}
					valueOfField={formik.values.lookingForAJob}
					onBlur={formik.handleBlur}
					formik={formik}
				/>
				<StandardField
					nameOfField='lookingForAJobDescription'
					nameOfError='lookingForAJobDescription'
					textOfLabelField='My professional skills'
					typeOfField='input'
					handleChange={handlerChange}
					valueOfField={formik.values.lookingForAJobDescription}
					onBlur={formik.handleBlur}
					error={error}
					formik={formik}
				/>
				<StandardField
					nameOfField='aboutMe'
					nameOfError='aboutMe'
					textOfLabelField='About Me'
					typeOfField='input'
					handleChange={handlerChange}
					valueOfField={formik.values.aboutMe}
					onBlur={formik.handleBlur}
					error={error}
					formik={formik}
				/>
				{/* {formik.touched.aboutMe && formik.errors.aboutMe ? <div>{formik.errors.aboutMe}</div> : null} */}
				{
					Object.keys(contacts).map(key => {
						return (
							<StandardField
								key={key}
								nameOfField={'contacts.' + key}
								nameOfError={'Contacts->' + key}
								textOfLabelField={key}
								typeOfField='input'
								handleChange={handlerChange}
								valueOfField={formik.values.contacts[key]}
								onBlur={formik.handleBlur}
								error={error}
								formik={formik}
							/>
						)
					})
				}
				{!doesShowErrorButtons && <button type="submit">Submit</button>}
				{doesShowErrorButtons && <button style={{ color: 'white', background: 'red' }} type="submit">ERROR</button>}
			</div>
		</form>
	)
}

export default SettingsFields