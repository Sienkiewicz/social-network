import React, { FC } from 'react'
import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'

type Props = {
  setOpenSidebar: (p: boolean) => void
}

type LProps = {
  path: string
  nameOfPath: string
}

const Navbar: FC<Props> = (props) => {
  const setCloseSidebar = () => props.setOpenSidebar(false)

  const Link = (props: LProps) => {
    return (
      <NavLink
        activeClassName={s.active}
        to={`/${props.path}`}
        onClick={() => setCloseSidebar()}
      >
        {props.nameOfPath}
      </NavLink>
    )
  }

  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <Link path='profile' nameOfPath='Profile' />
        </li>
        <li>
          <Link path='messages' nameOfPath='Messages' />
        </li>
        <li>
          <Link path='users' nameOfPath='Users' />
        </li>
        <li>
          <Link path='news' nameOfPath='News' />
        </li>
        <li>
          <Link path='music' nameOfPath='Music' />
        </li>
        <li>
          <Link path='settings' nameOfPath='Settings' />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
