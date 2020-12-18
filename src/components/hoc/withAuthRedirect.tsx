import React, { FC } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

let mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
});

export function withAuthRedirect<WCP> (Component: React.ComponentType<WCP>) {

	const RedirectComponent: FC<MapStatePropsType & DispatchPropsType> = (
    props
  ) => {
    let { isAuth, ...restProps } = props

    return !props.isAuth ? (
      <Redirect to={'/login'} />
    ) : (
      <Component {...(restProps as WCP)} />
    )
  }

	let ConnectAuthRedirectComponent = connect<
    MapStatePropsType,
    DispatchPropsType,
    WCP,
    AppStateType
  >(mapStateToProps)(RedirectComponent)

	return ConnectAuthRedirectComponent
}

type MapStatePropsType = {
  isAuth: boolean
}
type DispatchPropsType = {
}

