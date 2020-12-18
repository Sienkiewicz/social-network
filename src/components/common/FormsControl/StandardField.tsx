import { FormikProps } from 'formik'
import React, { ChangeEvent, FC } from 'react'
import separateErrorMessage from '../SeparateErrorMessage'
import { ChangedSettingsType } from '../Types'

type Props = {
  nameOfField: string
  nameOfError: string
  textOfLabelField: string
  typeOfField: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  valueOfField?: string
  error: string[]
  formik: FormikProps<ChangedSettingsType>
}

const StandardField: FC<Props> = ({
  nameOfField,
  nameOfError,
  textOfLabelField,
  typeOfField,
  handleChange,
  valueOfField,
  error,
  formik
}) => {
  const { touched, errors, handleBlur } = formik
  const separator = (nameOfError: string) => {
    if (nameOfError.startsWith('Contacts->')) {
      let name = nameOfError.slice(10)
      return touched.contacts &&
        touched.contacts[name] &&
        errors.contacts &&
        errors.contacts[name] ? (
        <div style={{ color: 'red' }}>{errors.contacts[name]}</div>
      ) : null
    }
    return errors.contacts !== undefined && touched.contacts !== undefined && touched.contacts[nameOfError] &&
      errors.contacts[nameOfError] ? (
      <div style={{ color: 'red' }}>{errors.contacts[nameOfError]}</div>
    ) : null
  }
  return (
    <div>
      <label htmlFor={`contacts.${nameOfField}`}>
        {' '}
        {`${textOfLabelField}`}
      </label>
      <input
        id={`${nameOfField}`}
        placeholder={`${textOfLabelField}`}
        name={`${nameOfField}`}
        type={`${typeOfField}`}
        onChange={handleChange}
        value={valueOfField}
        onBlur={handleBlur}
      />
      {separator(nameOfError)}
      {/* {separator(nameOfError)} */}
      {separateErrorMessage(error, `${nameOfError}`) !== undefined ? (
        <div style={{ color: 'red' }}>
          {separateErrorMessage(error, `${nameOfError}`)}
        </div>
      ) : null}
    </div>
  )
}

export default StandardField