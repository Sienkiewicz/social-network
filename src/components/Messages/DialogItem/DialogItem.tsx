import React, { FC } from 'react';
import s from './../Messages.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  id: number
  imgUrl: string
  name: string
}
const DialogItem: FC<Props> = (props) => {
	let path = `/messages/${ props.id }`;

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
