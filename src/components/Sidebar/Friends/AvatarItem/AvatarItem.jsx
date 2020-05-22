import React from 'react'
import { NavLink } from 'react-router-dom';
import s from './../Friends.module.scss';

const AvatarItem = (props) => {
  let path = `/profile${props.id}`;
  return (
    <div className={s.user}>
      <NavLink to={path}>
        <img
          src='https://images.cdn1.stockunlimited.net/preview1300/fashionable-woman-avatar_1534607.jpg'
          alt=''
        />
        <p>{props.name}</p>
      </NavLink>
    </div>
  );
};

export default AvatarItem
