export const required = value => value ? undefined : 'Field is required';




export const maxLengthCreator = (maxlength) => (value) => {
	if (value.length > maxlength) return `Max length is ${maxlength} symbols`;
	return undefined
}