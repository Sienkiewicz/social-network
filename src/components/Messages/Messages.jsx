import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import s from './Messages.module.scss';
import { Field, reduxForm } from 'redux-form';
import { TextForm } from '../common/FormsControl/FormControls';
import { recuired, maxLengthCreator } from '../../utils/validators/validators';

let maxLength10 = maxLengthCreator(10);
const MessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        typeField='textarea'
        component={TextForm}
        name='textOfNewMessage'
        placeholder='write a message'
        validate={[recuired, maxLength10]}
      />
      <button>Send</button>
    </form>
  );
};

const AddMessageRedaxForm = reduxForm({ form: 'messageAreaForm' })(MessageForm);

const Messages = (props) => {
  let state = props.data;
  // 2-я итерация - превращаем фукцию DialogItem в мапированный массив, чтобы не дублировать код а мапировать один код, вне зависимости от количества входящих данных (в нашем случае от количества объектов в массиве)
  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} imgUrl={d.imgUrl} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} id={m.id} />
  ));

  let onSubmit = (value) => {
    props.addMessage(value.textOfNewMessage);
  };

  return (
    <div className={s.dialogs}>
      <ul className={s.dialogsItems}>{dialogsElements}</ul>
      <div className={s.messages}>
        {messagesElements}
        <AddMessageRedaxForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Messages;
