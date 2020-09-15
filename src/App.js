/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState, Suspense } from 'react';
import './Scss/nullstyle.scss';
import './App.scss';
import { Route } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { useSelector, useDispatch } from 'react-redux';
import { initializeApp } from './redux//app-reducer';
import Preloader from './components/common/preloader/Preloader';

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Messages = React.lazy(() => import('./components/Messages/Messages'));

const App = () => {
	const [openSidebar, setOpenSidebar] = useState(false)
	const initialized = useSelector(state => state.app.initialized);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeApp());
	}, [])

	if (!initialized) {
		return <Preloader />
	}

	return (
		<div className="app-wrapper" >
			<HeaderContainer
				openSidebar={openSidebar}
				setOpenSidebar={setOpenSidebar} />
			<div className='container'>
				<div className={openSidebar ? 'sidebar openSidebar' : 'sidebar'} >
					<Navbar
						openSidebar={openSidebar}
						setOpenSidebar={setOpenSidebar}
					/>
					<Sidebar />
				</div>
				<div className="content">
					<Suspense fallback={<Preloader />}>
						<Route path='/profile/:userId?' render={() => <ProfileContainer />} />
						<Route path='/messages' render={() => <Messages />} />
						<Route path='/users' render={() => <UsersContainer />} />
					</Suspense>
					<Route path='/news' render={() => <News />} />
					<Route path='/settings' render={() => <Settings />} />
					<Route path='/music' render={() => <Music />} />
					<Route path='/login' render={() => <Login />} />
				</div>
			</div>
		</div>
	);
}

export default App;


