import React from 'react';
import Post from './Post/Post';

const MyPosts = (props) => {
  // Second iteration with map

  let postsElement = props.posts.map((p) => (
    <Post key={p.id} count={p.count} message={p.post} />
  ));

  return <div>{postsElement}</div>;
};

export default MyPosts;
