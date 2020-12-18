import React, { FC } from 'react';
import s from './../Messages.module.scss';

const Message: FC<Props> = (props) => {
  return <div className={s.message}>{props.message} </div>;
};
export default Message;

type Props = {
  message: string
}