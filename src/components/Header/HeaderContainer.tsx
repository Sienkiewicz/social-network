import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

type Props = {
    openSidebar: boolean
    isAuth: boolean
    login: string | null
    logout: () => void
    
    setOpenSidebar: (openSidebar: boolean) => void
}

class HeaderContainer extends React.Component<Props> {


  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
