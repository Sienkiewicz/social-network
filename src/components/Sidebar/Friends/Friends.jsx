import React from 'react';
import s from './Friends.module.scss';
import AvatarItem from './AvatarItem/AvatarItem';

const Friends = (props) => {
  let users = [
    {
      id: '1',
      imgUrl:
        'https://images.cdn1.stockunlimited.net/preview1300/fashionable-woman-avatar_1534607.jpg',
      name: 'Wita',
    },
    {
      id: '2',
      imgUrl:
        'https://images.cdn1.stockunlimited.net/preview1300/fashionable-woman-avatar_1534607.jpg',
      name: 'Artem',
    },
    {
      id: '3',
      imgUrl:
        'https://images.cdn1.stockunlimited.net/preview1300/fashionable-woman-avatar_1534607.jpg',
      name: 'Dania',
    },
  ];

  let usersEl = users.map((user) => (
    <AvatarItem name={user.name} id={user.id} imgUrl={user.imgUrl} />
  ));

  return (
    <div className={s.wrap}>
      <h2 className={s.title}>Friends</h2>
      <div className={s.users}>{usersEl}</div>
    </div>
  );
};

export default Friends;
