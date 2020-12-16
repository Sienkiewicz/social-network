import React, { FC} from 'react'
import { WrappedFieldProps } from 'redux-form'
import s from './FormControls.module.scss'

type Props = {
  typeField: any
}

export const TextForm: FC<WrappedFieldProps & Props> = ({
  input,
  meta,
  typeField,
  ...props
}) => {
  let hasError = meta.touched && meta.error
  let Element = typeField 
  return (
    <div>
      <div>
        <Element className={hasError ? s.error : ''} {...input} {...props} />
      </div>
      {hasError && <span style={{ color: 'red' }}>{meta.error}</span>}
    </div>
  )
}
