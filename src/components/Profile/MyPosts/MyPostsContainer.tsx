import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts from './MyPosts';

// const MyPosts = (props) => {
//   // Second iteration with map

//   let postsElement = props.posts.map((p) => (
//     <Post count={p.count} message={p.post} />
//   ));

//   return <div>{postsElement}</div>;
// };

let mapStateToProps = (state:AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};
const MyPostsContainer = connect(mapStateToProps)(MyPosts);
export default MyPostsContainer;
