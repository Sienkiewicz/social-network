import React from 'react';
import Personal_info from './Personal_info/Personal_info';
import Post_area from './Post_area/Post_area';
import MyPosts from './MyPosts/MyPosts';

// First iteration

const Profile = (props) => {
  return (
    <div>
      <Personal_info />
      <Post_area
        dispatch={props.dispatch}
        newPostText={props.profilePage.newPostText}
      />
      <MyPosts posts={props.profilePage.posts} />
    </div>
  );
};

export default Profile;
