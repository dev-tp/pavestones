<script>
	import ConfirmPassword from '$lib/components/ConfirmPassword.svelte';
	import validate from '$lib/validate';

	/** @type {import('./$types').PageProps} */
	let { form } = $props();

	/** @type {string} */
	let password = $state('');

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

		if (validate.password(password).length > 0) {
			return;
		}

		event.currentTarget.submit();
	}}
>
	<h1 class="text-3xl">Pavestones</h1>
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	<label class="grid gap-2">
		<span>Email <span class="text-red-500">*</span></span>
		<input bind:value={email} class="border p-1" name="email" type="email" required />
		{#if email !== '' && !validate.email(email)}
			<span class="text-red-500">Invalid email</span>
		{/if}
	</label>
	<label class="grid gap-2">
		<span>Username <span class="text-red-500">*</span></span>
		<input bind:value={username} class="border p-1" name="username" type="text" required />
		{#if username !== '' && !validate.username(username)}
			<span class="text-red-500">Invalid username</span>
		{/if}
	</label>
	<ConfirmPassword bind:password />
	<button class="mt-4 bg-black p-2 text-white" type="submit">Register</button>
</form>
