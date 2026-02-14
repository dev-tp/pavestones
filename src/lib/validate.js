/** @type function(string | undefined, RegExp): boolean */
function validate(string, regex) {
	if (!string) {
		return false;
	}

	return regex.test(string);
}

/** @type function(string | undefined): boolean */
export function validateEmail(email) {
	return validate(
		email,
		/^(?!\.)(?!.*\.\.)([A-z0-9_'+\-\.]*)[A-z0-9_'+\-]@([A-z0-9][A-z0-9\-]*\.)+[A-z]{2,}$/
	);
}

/** @type function(string | undefined): string[] */
export function validatePassword(password) {
	if (!password) {
		return ['Password is empty'];
	}

	const errors = [];

	if (password.length < 8) {
		errors.push('Password needs to be at least 8 characters in length');
	}

	if (!/[0-9]/.test(password)) {
		errors.push('Password should contain at least 1 number');
	}

	if (!/[-!"#$%&'()*+/:;<>@[\]^_`{|}~]/.test(password)) {
		errors.push('Password should contain at least 1 symbol');
	}

	if (!/[A-Z]/.test(password)) {
		errors.push('Password should contain at least 1 uppercase letter');
	}

	return errors;
}

/** @type function(string | undefined): boolean */
export function validateUsername(username) {
	return validate(username, /^[A-z0-9]{3,}$/);
}
