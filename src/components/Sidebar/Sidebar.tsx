import React, { FC } from 'react'
import s from './Sidebar.module.scss'
import Friends from './Friends/Friends'

const Sidebar: FC = () => {
	return (
    <div className={s.sidebar}>
      {/* <Friends /> */}
    </div>
  );
}

export default Sidebar
