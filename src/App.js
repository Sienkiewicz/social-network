/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import './Scss/nullstyle.scss';
import './App.scss';
import { Route } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux//app-reducer';
import Preloader from './components/common/preloader/Preloader';



class App extends React.Component {

	componentDidMount() {
		this.props.initializeApp();
	}

	render() {

		if(!this.props.initialized) {
			return <Preloader />
		}

		return (
			<div className="app-wrapper">
				<HeaderContainer />
				<div className="container">
					<div className='sidebar'>
						<Navbar />
						<Sidebar />
					</div>
					<div className="content">
						{/* <Route path='/profile' component= {Profile}/> */}
						{/* <Route path='/messages' component={Messages} />
						<Route path='/news' component={News} />
						<Route path='/settings' component={Settings} />
						<Route path='/music' component={Music} /> */}
						<Route path='/profile/:userId?' render={() => <ProfileContainer />} />
						<Route path='/messages' render={() => <MessagesContainer />} />
						<Route path='/users' render={() => <UsersContainer />} />
						<Route path='/news' render={() => <News />} />
						<Route path='/settings' render={() => <Settings />} />
						<Route path='/music' render={() => <Music />} />
						<Route path='/login' render={() => <Login />} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);


