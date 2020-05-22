import React from 'react';
import Personal_info from '../Profile/Personal_info/Personal_info';
import Post_area from '../Profile/Post_area/Post_area';
import Post from '../Profile/Post/Post';

const Profile = () => {
  return (
    <div>
      <img
        src='https://cdn.naturettl.com/wp-content/uploads/2015/05/22015021/featured3.jpg'
        alt=''
      />
      <Personal_info />
      <Post_area />
      <Post
        count='15'
        message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, obcaecati. Voluptas ut non earum voluptates quidem quam odit est numquam deleniti veniam, enim consequuntur corporis, quibusdam dolorem, incidunt repellat corrupti alias officiis aspernatur cumque voluptate! Libero sint quis voluptate beatae, dolor hic quibusdam sed enim cupiditate doloremque perferendis ullam voluptas.'
      />
		<Post count = '10' message = 'Hi there' />
    </div>
  );
};

export default Profile;


