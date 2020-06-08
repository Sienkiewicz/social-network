import {
  addPostActionCreator,
} from '../../../redux/profile-reducer';
import Post_area from './Post_area';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (textOfNewPost) => {
      dispatch(addPostActionCreator(textOfNewPost));
    },
  };
};

const Post_area_container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post_area);
export default Post_area_container;
