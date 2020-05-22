/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import './Scss/nullstyle.scss';
import './App.scss';
import Header from './components/Header/Header';
import { Route, BrowserRouter } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';




function App(props) {



	return (
		<BrowserRouter>
			<div className="app-wrapper">
				<Header />
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
						<Route path='/profile' render={() => <Profile
							profilePage={props.state.profilePage}
							dispatch={props.dispatch}
						/>} />
						<Route path='/messages' render={() => <Messages data={props.state.messagesPage} dispatch={props.dispatch} />} />
						<Route path='/news' render={() => <News />} />
						<Route path='/settings' render={() => <Settings />} />
						<Route path='/music' render={() => <Music />} />
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;


