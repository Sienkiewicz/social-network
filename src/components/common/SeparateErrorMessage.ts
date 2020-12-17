
export const separateErrorMessage = (error: string[], nameOfErrorField: string) => {
	let errorField = nameOfErrorField.toUpperCase();
	if (error !== undefined) {
		let message = error.find(m => m.toUpperCase().includes(errorField))
		if (message !== undefined) {
			let num = nameOfErrorField.length + 3;
			return message.slice(0, -(+num))
		}
	}
}

export default separateErrorMessage
