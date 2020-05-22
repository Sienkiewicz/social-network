import React from 'react';
import s from './../Messages.module.scss';
import { NavLink } from 'react-router-dom';

// 1-я итерация - превращаем jsx в функцию
const DialogItem = (props) => {
  let path = `/messages/${props.id}`;

  return (
    <li>
      <div>
        <img src={props.imgUrl} alt='' />
      </div>
      <NavLink to={path} activeClassName={s.active}>
        {props.name}
      </NavLink>
    </li>
  );
};

export default DialogItem;
