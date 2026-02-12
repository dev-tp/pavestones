<script>
	import { validateEmail, validatePassword, validateUsername } from '$lib';

	/** @type {import('./$types').PageProps} */
	let { form } = $props();

	/** @type {string} */
	let password = $state('');

	/** @type {string} */
	let confirmPassword = $state('');

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
	class="grid w-full gap-2 p-8 md:m-auto md:w-1/4 md:p-0 md:pt-8"
	method="POST"
	onsubmit={(event) => {
		event.preventDefault();

		if (!validateEmail(email)) {
			return;
		}

		if (!validateUsername(username)) {
			return;
		}

		if (validatePassword(password).length > 0) {
			return;
		}

		if (password !== confirmPassword) {
			return;
		}

		event.currentTarget.submit();
	}}
>
	<h1 class="text-3xl">Pavestones</h1>
	<label class="grid gap-2">
		<span>Email <span class="text-red-500">*</span></span>
		<input bind:value={email} class="border p-1" name="email" type="email" required />
		{#if email !== '' && !validateEmail(email)}
			<span class="text-red-500">Invalid email</span>
		{/if}
	</label>
	<label class="grid gap-2">
		<span>Username <span class="text-red-500">*</span></span>
		<input bind:value={username} class="border p-1" name="username" type="text" required />
		{#if username !== '' && !validateUsername(username)}
			<span class="text-red-500">Invalid username</span>
		{/if}
	</label>
	<label class="grid gap-2">
		<span>Password <span class="text-red-500">*</span></span>
		<input bind:value={password} class="border p-1" name="password" type="password" required />
		{#if password !== ''}
			{@const errors = validatePassword(password)}
			<ul class="list-inside list-disc" class:hidden={errors.length === 0}>
				{#each errors as error}
					<li>{error}</li>
				{/each}
			</ul>
		{/if}
	</label>
	<label class="grid gap-2">
		<span>Confirm Password <span class="text-red-500">*</span></span>
		<input bind:value={confirmPassword} class="border p-1" type="password" required />
		{#if confirmPassword !== '' && confirmPassword !== password}
			<span class="text-red-500">Passwords do not match</span>
		{/if}
	</label>
	<button class="mt-4 bg-black p-2 text-white" type="submit">Register</button>
</form>
