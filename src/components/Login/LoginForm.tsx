import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { TextForm } from '../common/FormsControl/FormControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { useDispatch, useSelector } from 'react-redux';
import s from '../common/FormsControl/FormControls.module.scss';
import style from './Login.module.scss';
import PreloaderCircle from '../common/preloaders/PreloaderCircle';
import { actions } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { FormDataType } from './Login';

let maxLength30 = maxLengthCreator(30)

const LoginForm: FC<InjectedFormProps<FormDataType>> = (props) => {
  const isFetching = useSelector((state: AppStateType) => state.auth.isFetching);
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const errorMessages = useSelector((state: AppStateType) => state.auth.error);

  const dispatch = useDispatch();

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={style.content}>
        <div>
          <Field
            typeField='input'
            component={TextForm}
            validate={[required, maxLength30]}
            placeholder={'Email'}
            name={'email'}
            className={s.field}
            onChange={() => dispatch(actions.addErrorMessages([]))} />
        </div>
        <div>
          <Field
            typeField='input'
            type={'password'}
            placeholder={'Password'}
            name={'password'}
            component={TextForm}
            validate={[required, maxLength30]}
            className={s.field}
            onChange={() => dispatch(actions.addErrorMessages([]))} />
        </div>
        <div>
          <Field
            component={'input'}
            name={'rememberMe'}
            type={'checkbox'}
            className={s.rememberMe} />
          remember me
        </div>
        {captchaUrl && <img src={captchaUrl} alt='captcha' />}
        {captchaUrl && (
          <Field
            placeholder={'Symbols from image'}
            typeField='input'
            component={TextForm}
            name={'captcha'}
            type={'captcha'}
            validate={[required]}
            className={s.rememberMe} />
        )}
        {props.error && <div className={s.formSummeryError}>{props.error}</div>}
        {errorMessages && (
          <div className={s.formSummeryError}>{errorMessages[0]}</div>
        )}
        <div>
          <button>
            {isFetching ? (
              <div>
                <PreloaderCircle />
              </div>
            ) : (
                <div>Login</div>
              )}
          </button>
        </div>
      </div>
      <div className={style.message}>
        <div>
          Feel free to use this:{' '}
          <b> Email: free@samuraijs.com Password: free </b>
        </div>
        <div>Sorry, but it's a beta and this webpage may not work on IOS </div>
      </div>
    </form>
  );
};
export const LoginReduxForm = reduxForm<FormDataType>({ form: 'login' })(LoginForm);
