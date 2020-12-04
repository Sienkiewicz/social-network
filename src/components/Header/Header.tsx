import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';


type Props = {
    openSidebar: boolean
    isAuth: boolean
    login: string | null
    
    logout: () => void
    setOpenSidebar: (openSidebar: boolean) => void
}

const Header: FC<Props> = (props) => {
	return (
		<header className={`${s.header}`}>
			<img
				onClick={() => props.setOpenSidebar(!props.openSidebar)}
				src='https://images.vexels.com/media/users/3/137692/isolated/preview/e425fa1fe274a2267405829771f13a13-simple-logo-geometric-polygonal-by-vexels.png'
				alt=''
			/>
			<div className={s.loginBlock}>
				{props.isAuth
					? <div> {props.login} - <button className={s.button} onClick={props.logout}>LogOut</button> </div>
					: <NavLink to={'/login'}>Login</NavLink>}
			</div>
		</header>
	);
};

export default Header;
