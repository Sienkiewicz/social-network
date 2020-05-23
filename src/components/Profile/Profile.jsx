import React from 'react';
import Personal_info from './Personal_info/Personal_info';
import MyPosts from './MyPosts/MyPosts';
import Post_area_container from './Post_area/Post_area_container';

// First iteration

const Profile = (props) => {
let state = props.store.getState();

  return (
    <div>
      <Personal_info />
      <Post_area_container store={props.store} />
      <MyPosts store={props.store} posts={state.profilePage.posts} />
    </div>
  );
};

export default Profile;
