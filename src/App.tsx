/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState, Suspense, FC } from 'react'
import './Scss/nullstyle.scss'
import './App.scss'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import Navbar from './components/Navbar/Navbar'
// import Sidebar from './components/Sidebar/Sidebar';
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import { useSelector, useDispatch } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloaders/Preloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons'
import NotFound from './components/NotFound'
import { actions } from './redux/profile-reducer'
import { AppStateType } from './redux/redux-store'

const UsersContainer = React.lazy(
  () => import('./components/Users/UsersContainer')
)
const ProfileContainer = React.lazy(
  () => import('./components/Profile/ProfileContainer')
)
const Messages = React.lazy(() => import('./components/Messages/Messages'))

const App: FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const initialized = useSelector(
    (state: AppStateType) => state.app.initialized
  )
  const isEditMode = useSelector(
    (state: AppStateType) => state.profilePage.isEditMode
  )
  const userId = useSelector((state: AppStateType) => state.auth.id)
  const dispatch = useDispatch()

type MatchParamsType = {
  userId: string | undefined
}

  const match = useRouteMatch('/users')
  const matchProfile = useRouteMatch<MatchParamsType>('/profile/:userId?')

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <div className='app-wrapper'>
      <HeaderContainer
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <div className='container'>
        <div className={openSidebar ? 'sidebar openSidebar' : 'sidebar'}>
          <Navbar setOpenSidebar={setOpenSidebar} />
          {/* <Sidebar /> */}
        </div>
        <div className='content'>
          <Suspense fallback={<Preloader />}>
            <Switch>
              <Route
                exact
                path='/'
                render={
                  userId
                    ? () => <Redirect to={'/profile/' + userId} />
                    : () => <Redirect to='/login' />
                }
              />
              <Route
                exact
                path='/profile'
                render={
                  userId
                    ? () => <Redirect to={'/profile/' + userId} />
                    : () => <Redirect to='/login' />
                }
              />
              <Route
                path='/profile/:userId?'
                render={() => <ProfileContainer />}
              />
              <Route path='/messages' render={() => <Messages />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/news' render={() => <News />} />
              <Route path='/settings' render={() => <Settings />} />
              <Route path='/music' render={() => <Music />} />
              <Route path='/login' render={() => <Login />} />
              <Route render={() => <NotFound />} />
            </Switch>
          </Suspense>
        </div>
      </div>
      <div className='bottomNavBar'>
        {match === null &&
          matchProfile?.params.userId !== undefined &&
          userId === +matchProfile.params.userId && (
            <FontAwesomeIcon
              className='bottomNavBar__iconSettings fa-2x'
              icon={faCog}
              onClick={() => dispatch(actions.toggleEditMode(!isEditMode))}
            />
          )}
        <FontAwesomeIcon
          onClick={() => setOpenSidebar(!openSidebar)}
          className='bottomNavBar__iconBurger fa-2x'
          icon={faBars}
        />
      </div>
    </div>
  )
}

export default App
