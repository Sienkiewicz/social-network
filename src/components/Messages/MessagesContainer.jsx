import React from 'react';
import {
  addMessageActionCreator,
  updateNewMessageActionCreator,
} from '../../redux/messages-reducer';
import Messages from './Messages';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
  return {
    data: state.messagesPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    MessageChange: (text) => {
      dispatch(updateNewMessageActionCreator(text));
    },
    addMessage: () => {
      dispatch(addMessageActionCreator());
    },
  };
};

const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
export default MessagesContainer;
