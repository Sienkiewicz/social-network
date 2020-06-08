import React from 'react';
import s from './Personal_info.module.scss';
import Preloader from '../../common/preloader/Preloader';
import userPhoto from '../../../assets/icons/icon_developer.jpg'

const Personal_info = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <img
        src='https://cdn.naturettl.com/wp-content/uploads/2015/05/22015021/featured3.jpg'
        alt=''
      />
      <div className={s.persinfo}>
        <img className={s.awatar} src={props.profile.photos.large || userPhoto} />
        <div>
          <h1> {props.profile.fullName} </h1>
          <ul>
            <li className={s.item}>
              Запрос: {props.profile.lookingForAJobDescription}
            </li>
            <li>City: Wroclaw</li>
            <li>Education: UkrDLTU</li>
            <li>
              Instagram:{' '}
              <a target='blank' href={props.profile.contacts.instagram}>
                {props.profile.contacts.instagram}
              </a>
              /
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Personal_info;
