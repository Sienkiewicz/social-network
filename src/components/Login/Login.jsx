import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextForm } from '../common/FormsControl/FormControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { connect, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControl/FormControls.module.scss';
import style from './Login.module.scss';
import PreloaderCircle from './../common/preloaders/PreloaderCircle'
import { useEffect } from 'react';

let maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
	const isFetching = useSelector(state => state.auth.isFetching)
	const captchaUrl = useSelector(state => state.auth.captchaUrl)

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
				<div>
					<button>{isFetching
						? <div><PreloaderCircle /></div>
						: <div>Login</div>}
					</button>
				</div>
			</div>
		<div className={style.message}>
				<div>If you would like to check this webpage, please feel free to ask for a username and password.</div>
				<div>Peter Sinkevych</div>
				<div><b>peter@sinkevich.com.ua</b></div>
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
