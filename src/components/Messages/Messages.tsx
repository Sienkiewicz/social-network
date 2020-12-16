import React, { FC } from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import s from './Messages.module.scss'
import { useSelector } from 'react-redux'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { AppStateType } from '../../redux/redux-store'
import { AddMessageForm } from './AddMessageForm'

const Messages: FC = () => {
  const state = useSelector((state: AppStateType) => state.messagesPage)

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} imgUrl={d.imgUrl} />
  ))

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ))

  return (
    <div className={s.dialogs}>
      <ul className={s.dialogsItems}>{dialogsElements}</ul>
      <div className={s.messages}>
        {messagesElements}
        <div>
          <AddMessageForm />
        </div>
      </div>
    </div>
  )
}

export default withAuthRedirect(Messages)
