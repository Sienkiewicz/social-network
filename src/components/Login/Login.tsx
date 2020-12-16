import React, { FC } from 'react'
import { connect, useSelector } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import s from '../common/FormsControl/FormControls.module.scss'
import { AppStateType } from '../../redux/redux-store'
import { LoginReduxForm } from './LoginForm'

const Login: FC<MapStatePropsType & MapDispatchToPropsType> = (props) => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const onSubmit = (formData: FormDataType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    )
  }

  if (isAuth) {
    return <Redirect to={'/profile'} />
  }

  return (
    <div className={s.container}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
})

export default connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(
  mapStateToProps,
  { login }
)(Login)

export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: null | string
}

type MapStatePropsType = {
  isAuth: boolean
}

type MapDispatchToPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | string
  ) => void
}