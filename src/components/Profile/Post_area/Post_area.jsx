import React from 'react';
import s from './Post_area.module.scss';
import { Field, reduxForm } from 'redux-form';
import {
  recuired,
  maxLengthCreator,
} from '../../../utils/validators/validators';
import {TextForm } from '../../common/FormsControl/FormControls';

let maxLength10 = maxLengthCreator(10);

const PostAreaForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        typeField='textarea'
        component={TextForm}
        name='textOfNewPost'
        placeholder='your redux news'
        validate={[recuired, maxLength10]}
      />
      <button className={s.btn}>Send</button>
    </form>
  );
};

const AddPostRedaxForm = reduxForm({ form: 'postAreaForm' })(PostAreaForm);

const Post_area = (props) => {
  let onSubmit = (value) => {
    props.addPost(value.textOfNewPost);
  };

  return (
    <div className={s.post}>
      <h2>My posts</h2>
      <AddPostRedaxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Post_area;
