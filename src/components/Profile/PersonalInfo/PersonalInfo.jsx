import React from 'react';
import s from './PersonalInfo.module.scss';
import Preloader from '../../common/preloader/Preloader';
import userPhoto from '../../../assets/icons/icon_developer.jpg'

const PersonalInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.persinfo}>
        <img className={s.awatar} src={props.profile.photos.large || userPhoto} alt='' />
        <div>
          <h1> {props.profile.fullName} </h1>
          <ul>
            <li className={s.item}>
              Looking for a job? {props.profile.lookingForAJobDescription}
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

export default PersonalInfo;
