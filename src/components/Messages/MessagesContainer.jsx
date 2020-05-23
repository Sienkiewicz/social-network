import React from 'react';
import {
  addMessageActionCreator,
  updateNewMessageActionCreator,
} from '../../redux/messages-reducer';
import Messages from './Messages';

const MessagesContainer = (props) => {
	let state = props.store.getState();

  let addMessage = () => {
    props.store.dispatch(addMessageActionCreator());
  };

  let MessageChange = (text) => {
    props.store.dispatch(updateNewMessageActionCreator(text));
  };

  return <Messages addMessage={addMessage} MessageChange={MessageChange} data = {state.messagesPage}/>;
};

export default MessagesContainer;
