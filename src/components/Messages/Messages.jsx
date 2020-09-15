import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import s from './Messages.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addMessageActionCreator } from '../../redux/messages-reducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { Formik, Field, Form } from 'formik';



const SignupForm = () => {

	const dispatch = useDispatch()
	let onSubmit = (values, onSubmitProps) => {
		dispatch(addMessageActionCreator(values.message));
		onSubmitProps.resetForm()
	}
	return (
		<Formik
			initialValues={{ message: '' }}
			onSubmit = {onSubmit}
		>
			<Form>
				<div>
					<Field name="message" as="textarea" className="form-input" />
				</div>
				<button type="submit">Submit</button>
			</Form>
		</Formik>
	);
};


const Messages = () => {

	const state = useSelector(state => state.messagesPage)

	// const dispatch = useDispatch()

	//   let state = props.data;
	// 2-я итерация - превращаем фукцию DialogItem в мапированный массив, чтобы не дублировать код а мапировать один код, вне зависимости от количества входящих данных (в нашем случае от количества объектов в массиве)
	let dialogsElements = state.dialogs.map((d) => (
		<DialogItem name={d.name} key={d.id} id={d.id} imgUrl={d.imgUrl} />
	));

	let messagesElements = state.messages.map((m) => (
		<Message message={m.message} key={m.id} id={m.id} />
	));

	//   let onSubmit = (value) => {
	//     props.addMessage(value.textOfNewMessage);
	//   };

	// let onSubmit = value => {
	// 	dispatch(addMessageActionCreator(value.textOfNewMessage));
	// };

	return (
		<div className={s.dialogs}>
			<ul className={s.dialogsItems}>{dialogsElements}</ul>
			<div className={s.messages}>
				{messagesElements}
				{/* <AddMessageReduxForm onSubmit={onSubmit} /> */}
				<div>
					<SignupForm />
				</div>
			</div>

		</div>
	);
};

export default withAuthRedirect(Messages);
