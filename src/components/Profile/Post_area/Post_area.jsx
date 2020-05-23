import React from 'react';
import s from './Post_area.module.scss';

const Post_area = (props) => {
  let newPostElement = React.createRef();

  let onAddPost = () => {
	  props.addPost();
  };

  let onPostChange = () => {
	 let text = newPostElement.current.value;
    props.updateNewPostText(text);
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
      <button onClick={onAddPost} className={s.btn}>
        Send
      </button>
    </div>
  );
};

export default Post_area;
