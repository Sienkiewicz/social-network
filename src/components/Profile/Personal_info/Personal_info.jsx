import React from 'react';
import s from './Personal_info.module.scss';

const Personal_info = () => {
  return (
    <div>
      <img
        src='https://cdn.naturettl.com/wp-content/uploads/2015/05/22015021/featured3.jpg'
        alt=''
      />
      <div className={s.persinfo}>
        <img
          className={s.awatar}
          src='https://filestore.community.support.microsoft.com/api/profileimages/1a0b9821-ae11-4c60-9d46-628071c18aa2'
          alt=''
        />
        <div>
          <h1>Piotr S</h1>
          <ul>
            <li className={s.item}>Date of Birth: 2 januaty</li>
            <li>City: Wroclaw</li>
            <li>Education: UkrDLTU</li>
            <li>
              Web Site:{' '}
              <a target='blank' href='https://fotosienkiewicz.com/'>
                fotosienkiewicz.com
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
