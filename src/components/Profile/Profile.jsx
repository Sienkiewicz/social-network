import React from 'react';
import Personal_info from './Personal_info/Personal_info';
import Post_area_container from './Post_area/Post_area_container';
import MyPostsContainer from './MyPosts/MyPostsContainer';

// First iteration

const Profile = () => {
  return (
    <div>
      <Personal_info />
      <Post_area_container />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
