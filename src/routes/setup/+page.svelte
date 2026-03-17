<script>
	import ConfirmPassword from '$lib/components/ConfirmPassword.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import validate from '$lib/validate';

	/** @type {import('./$types').PageProps} */
	let { form } = $props();

	/** @type {boolean} */
	let isValidPassword = $state(false);

	/** @type {string} */
	let email = $derived(form ? form.email : '');

	/** @type {string} */
	let username = $derived.by(() => {
		if (form) {
			return form.username;
		}

		const match = email.search('@');

		if (match > -1) {
			return email.substring(0, match);
		}

		return '';
	});
</script>

<form
	class="grid w-full gap-2 p-8 md:m-auto md:w-1/3 md:px-0"
	method="POST"
	onsubmit={(event) => {
		event.preventDefault();

		if (!validate.email(email)) {
			return;
		}

		if (!validate.username(username)) {
			return;
		}

		if (!isValidPassword) {
			return;
		}

		event.currentTarget.submit();
	}}
>
	<h1 class="text-3xl">Pavestones</h1>
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	<TextInput
		bind:value={email}
		error={email !== '' && !validate.email(email) ? 'Invalid email' : ''}
		label="Email"
		name="email"
		required
	/>
	<TextInput
		bind:value={username}
		error={username !== '' && !validate.username(username) ? 'Invalid username' : ''}
		label="Username"
		name="username"
		required
	/>
	<ConfirmPassword bind:valid={isValidPassword} />
	<button class="mt-4 bg-black p-2 text-white" type="submit">Register</button>
</form>
