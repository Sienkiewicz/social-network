import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import s from './Messages.module.scss';
import {
  addMessageActionCreator,
  updateNewMessageActionCreator,
} from '../../redux/messages-reducer';

const Messages = (props) => {

	let state = props.data;
  // 2-я итерация - превращаем фукцию DialogItem в мапированный массив, чтобы не дублировать код а мапировать один код, вне зависимости от количества входящих данных (в нашем случае от количества объектов в массиве)
  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} imgUrl={d.imgUrl} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} id={m.id} />
  ));

  let onAddMessage = () => {
	//  props.dispatch(addMessageActionCreator());
	 props.addMessage();
  };

  let onMessageChange = (e) => {
    let text = e.target.value;
	//  props.dispatch(updateNewMessageActionCreator(text));
	props.MessageChange(text);
  };

  return (
    <div className={s.dialogs}>
      <ul className={s.dialogsItems}>{dialogsElements}</ul>
      <div className={s.messages}>
        {messagesElements}
        <textarea
          onChange={onMessageChange}
          className={s.textarea}
          value={props.data.newMessageText}
        />
        <button onClick={onAddMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
