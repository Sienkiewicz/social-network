import {
  addMessageActionCreator,
} from '../../redux/messages-reducer';
import Messages from './Messages';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';





let mapStateToProps = (state) => {
  return {
    data: state.messagesPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (textOfNewMessage) => {
      dispatch(addMessageActionCreator(textOfNewMessage));
    },
  };
};




// const MessagesContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Messages);
// export default MessagesContainer;
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Messages);
