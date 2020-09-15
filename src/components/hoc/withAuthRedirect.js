import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {

	const RedirectComponent = (props) => {
		
		return !props.isAuth
			? <Redirect to={'/login'} /> :
			<Component {...props} />
	}
	// class RedirectComponent extends React.Component {
	// 	render() {
	// 		if (!this.props.isAuth) return <Redirect to={'/login'} />
	// 		return <Component {...this.props} />
	// 	}
	// }
	let ConnectAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);

	return ConnectAuthRedirectComponent
}

