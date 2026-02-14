/** @type {(value: string | undefined, regex: RegExp) => boolean} */
function validate(value, regex) {
	if (!value) {
		return false;
	}

	return regex.test(value);
}

/** @type {(value: string | undefined) => boolean} */
export function email(value) {
	return validate(
		value,
		/^(?!\.)(?!.*\.\.)([A-z0-9_'+\-\.]*)[A-z0-9_'+\-]@([A-z0-9][A-z0-9\-]*\.)+[A-z]{2,}$/
	);
}

/** @type {(value: string | undefined) => string[]} */
export function password(value) {
	if (!value) {
		return ['Password is empty'];
	}

	const errors = [];

	if (value.length < 8) {
		errors.push('Password needs to be at least 8 characters in length');
	}

	if (!/[0-9]/.test(value)) {
		errors.push('Password should contain at least 1 number');
	}

	if (!/[-!"#$%&'()*+/:;<>@[\]^_`{|}~]/.test(value)) {
		errors.push('Password should contain at least 1 symbol');
	}

	if (!/[A-Z]/.test(value)) {
		errors.push('Password should contain at least 1 uppercase letter');
	}

	return errors;
}

/** @type {(value: string | undefined) => boolean} */
export function username(value) {
	return validate(value, /^[A-z0-9]{3,}$/);
}

export default {
	email,
	password,
	username
};
