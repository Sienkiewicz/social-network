import React from 'react';
import Personal_info from './Personal_info/Personal_info';
import Post_area_container from './Post_area/Post_area_container';
import MyPostsContainer from './MyPosts/MyPostsContainer';

// First iteration

const Profile = (props) => {
  return (
    <div>
      <Personal_info profile={props.profile} />
      <Post_area_container />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
