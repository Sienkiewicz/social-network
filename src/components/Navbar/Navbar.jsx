import React from 'react';
import s from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <NavLink activeClassName={s.active} to='/profile'>Profile</NavLink>
        </li>
        <li>
          <NavLink activeClassName={s.active} to='messages'>Messages</NavLink>
        </li>
        <li>
          <NavLink activeClassName={s.active} to='news'>News</NavLink>
        </li>
        <li>
          <NavLink activeClassName={s.active} to='music'>Music</NavLink>
        </li>
        <li>
          <NavLink activeClassName={s.active} to='settings'>Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
