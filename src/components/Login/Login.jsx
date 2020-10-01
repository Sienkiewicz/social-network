import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextForm } from '../common/FormsControl/FormControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { connect, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControl/FormControls.module.scss';

let maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
	const captchaUrl = useSelector(state => state.auth.captchaUrl)
	return (
		<form
			onSubmit={props.handleSubmit}
		>
			<div>
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
					<button>Login</button>
				</div>
				
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
