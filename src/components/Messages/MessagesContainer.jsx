import Messages from './Messages';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';





// let mapDispatchToProps = (dispatch) => {
//   return {
//     addMessage: (textOfNewMessage) => {
//       dispatch(addMessageActionCreator(textOfNewMessage));
//     },
//   };
// };




// const MessagesContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Messages);
// export default MessagesContainer;
export default compose(
  withAuthRedirect
)(Messages);
