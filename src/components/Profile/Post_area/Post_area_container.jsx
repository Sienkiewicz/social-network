import React from 'react';
import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from '../../../redux/profile-reducer';
import Post_area from './Post_area';

const Post_area_container = (props) => {
let state = props.store.getState();

//   let onAddPost = () => {
//     props.dispatch(addPostActionCreator());
//   };

  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostActionCreator(text));
  };

  return (
    <Post_area
      updateNewPostText={onPostChange}
      addPost={() => {
        props.store.dispatch(addPostActionCreator());
      }}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default Post_area_container;
