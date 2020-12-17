import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/messages-reducer';
import { Formik, Field, Form } from 'formik';

export const AddMessageForm: FC = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, onSubmitProps) => {
        dispatch(actions.addMessageActionCreator(values.message));
        onSubmitProps.resetForm();
      }}
    >
      <Form>
        <div>
          <Field name='message' as='textarea' className='form-input' />
        </div>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
};