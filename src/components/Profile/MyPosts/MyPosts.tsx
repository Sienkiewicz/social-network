import React, { FC } from 'react'
import { PostType } from '../../common/Types'
import Post from './Post/Post'

type Props = {
  posts: PostType[]
}

const MyPosts: FC<Props> = (props) => {
  // Second iteration with map

  let postsElement = props.posts.map((p) => (
    <Post key={p.id} count={p.count} message={p.post} />
  ))

  return <div>{postsElement}</div>
}

export default MyPosts
