import React from 'react';
import Personal_info from './Personal_info/Personal_info';
import Post_area_container from './Post_area/Post_area_container';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileStatus from './ProfileStatus/ProfileStatus';

// First iteration

const Profile = (props) => {
  return (
    <div>
      <Personal_info profile={props.profile} />
      <ProfileStatus
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <Post_area_container />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
