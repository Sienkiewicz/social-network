import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextForm } from '../common/FormsControl/FormControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { connect, useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControl/FormControls.module.scss';
import style from './Login.module.scss';
import PreloaderCircle from './../common/preloaders/PreloaderCircle'
import { useEffect } from 'react';
import { actions } from './../../redux/auth-reducer'


let maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
	const isFetching = useSelector(state => state.auth.isFetching)
	const captchaUrl = useSelector(state => state.auth.captchaUrl)
	const errorMessages = useSelector(state => state.auth.error)

	const dispatch = useDispatch()



	useEffect(() => {
	}, [isFetching])
	return (
		<form
			onSubmit={props.handleSubmit}
		>
			<div className={style.content}>
				<div>
					<Field
						typeField='input'
						component={TextForm}
						validate={[required, maxLength30]}
						placeholder={'Email'}
						name={'email'}
						className={s.field}
						onChange={() => dispatch(actions.addErrorMessages([]))}
					/>
				</div>
				<div>
					<Field
						type={'password'}
						placeholder={'Password'}
						name={'password'}
						typeField='input'
						component={TextForm}
						validate={[required, maxLength30]}
						className={s.field}
						onChange={() => dispatch(actions.addErrorMessages([]))}
					/>
				</div>
				<div>
					<Field
						component={'input'}
						name={'rememberMe'}
						type={'checkbox'}
						className={s.rememberMe}
					/>
          remember me
        </div>
				{captchaUrl && <img src={captchaUrl} alt='captcha' />}
				{captchaUrl && <Field
					placeholder={'Symbols from image'}
					name={'captcha'}
					type={'captcha'}
					typeField='input'
					component={TextForm}
					validate={[required]}
					className={s.rememberMe}
				/>}
				{props.error && <div className={s.formSummeryError}>{props.error}</div>}
				{errorMessages && <div className={s.formSummeryError}>{errorMessages[0]}</div>}
				<div>
					<button>{isFetching
						? <div><PreloaderCircle /></div>
						: <div>Login</div>}
					</button>
				</div>
			</div>
			<div className={style.message}>
				<div>Feel free to use this: <b> Email: free@samuraijs.com Password: free </b></div>
				<div>Sorry, but it's a beta and this webpage may not work on IOS </div>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

	const isAuth = useSelector(state => state.auth.isAuth)
	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	};

	if (isAuth) {
		return <Redirect to={'/profile'} />;
	}

	return (
		<div className={s.container}>
			<h1>LOGIN</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);
