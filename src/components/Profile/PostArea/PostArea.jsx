import React from 'react'
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { actions } from '../../../redux/profile-reducer';
import s from './PostArea.module.scss'


const SignupForm = () => {

	const dispatch = useDispatch()
	let onSubmit = (values, onSubmitProps) => {
		dispatch(actions.addPostActionCreator(values.textOfNewPost));
		onSubmitProps.resetForm()
	}
	return (
		<Formik
			initialValues={{ textOfNewPost: '' }}
			onSubmit={onSubmit}
		>
			<Form>
				<div>
					<Field
						name="textOfNewPost"
						as="textarea"
						className="form-input"
					/>
				</div>
				<button 
				className={s.btn}
				type="submit"
				>
				Submit
				</button>
			</Form>
		</Formik>
	);
};

const PostArea1 = () => {
	return (
		<div>
			<SignupForm />
		</div>
	)
}

export default PostArea1
