import React from 'react'
import SeparateErrorMessage from '../SeparateErrorMessage'


const StandardField = ({ nameOfField, nameOfError, textOfLabelField, typeOfField, handleChange, valueOfField, onBlur, error, formik }) => {

	const separator = nameOfError => {
		if (nameOfError.startsWith('Contacts->')) {
			let name = nameOfError.slice(10)
			return(
				formik.touched.contacts && formik.touched.contacts[name] &&
					formik.errors.contacts && formik.errors.contacts[name] 
					? <div style={{ color: 'red' }}>{formik.errors.contacts[name]}</div> : null
			)
		} return(
			formik.touched[nameOfError] && formik.errors[nameOfError] ? <div style={{ color: 'red' }}>{formik.errors[nameOfError]}</div> : null
		)
	}
	return (
		<div>
			<label htmlFor={`contacts.${ nameOfField }`} > {`${ textOfLabelField }`}</label>
			<input
				id={`${ nameOfField }`}
				placeholder={`${ textOfLabelField }`}
				name={`${ nameOfField }`}
				type={`${ typeOfField }`}
				onChange={handleChange}
				value={valueOfField}
				onBlur={onBlur}
			/>
			{separator(nameOfError)}
			{/* {separator(nameOfError)} */}
			{SeparateErrorMessage(error, `${ nameOfError }`) !== undefined ? <div style={{ color: 'red' }}>{SeparateErrorMessage(error, `${ nameOfError }`)}</div> : null}
		</div>
	)
}

export default StandardField