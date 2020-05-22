import React from 'react';
import s from './Post_area.module.scss';
import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from '../../../redux/profile-reducer';

const Post_area = (props) => {
  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostActionCreator(text));
  };

  return (
    <div className={s.post}>
      <h2>My posts</h2>
      <textarea
        ref={newPostElement}
        className={s.areaforpost}
        placeholder='your news'
        onChange={onPostChange}
        value={props.newPostText}
      />
      <button onClick={addPost} className={s.btn}>
        Send
      </button>
    </div>
  );
};

export default Post_area;
