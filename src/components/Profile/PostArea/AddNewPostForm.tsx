import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { actions } from '../../../redux/profile-reducer';
import s from './PostArea.module.scss';

export const AddNewPostForm: FC = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ textOfNewPost: '' }}
      onSubmit={(values, onSubmitProps) => {
        dispatch(actions.addPostActionCreator(values.textOfNewPost));
        onSubmitProps.resetForm();
      }}
    >
      <Form>
        <div>
          <Field name='textOfNewPost' as='textarea' className='form-input' />
        </div>
        <button className={s.btn} type='submit'>
          Submit
        </button>
      </Form>
    </Formik>
  );
};
