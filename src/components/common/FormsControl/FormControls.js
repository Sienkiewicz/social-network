import React from 'react'
import s from './FormControls.module.scss'


export const TextForm = ({ input, meta, typeField, ...props }) => {
	let hasError = meta.touched && meta.error;
	let Element = typeField
	return (
		<div>
			<div>
				<Element className={(hasError ? s.error : '')} {...input} {...props}/>
			</div>

			{hasError && <span style={{ color: 'red' }}>{meta.error}</span>}
		</div>
	)
}