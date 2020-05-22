import React from 'react';
import s from './Post.module.scss';

const Post = (props) => {
  return (
    <div className={s.container}>
      <div className={s.post}>
        <img
          src='https://s3-us-west-2.amazonaws.com/token-daily-bucket/user-images/4a2359b48887048317100f5e5d28d0d6.jpeg'
          alt='avatar_user'
        />
        <div>{props.message}</div>
      </div>
      <div className={s.wrap_btn}>
        <button className={s.btn}>{props.count} Likes</button>
      </div>
    </div>
  );
};

export default Post;
