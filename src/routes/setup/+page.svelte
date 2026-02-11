<script module>
	/** @typedef {Object} Props
	 * @property {import('./$types').ActionData} form
	 */
</script>

<script>
	/** @type {Props} */
	const { form } = $props();

	let password = $state('');
	let confirmPassword = $state('');

	let email = $derived(form && form.email ? form.email : '');
	let username = $derived.by(() => {
		if (form?.username) {
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

		if (password === '' || password !== confirmPassword) {
			return;
		}

		event.currentTarget.submit();
	}}
>
	<h1 class="text-3xl">Pavestones</h1>
	<label class="grid gap-2">
		<span>Email <span class="text-red-500">*</span></span>
		<input bind:value={email} class="border p-1" name="email" type="email" required />
	</label>
	<label class="grid gap-2">
		<span>Username <span class="text-red-500">*</span></span>
		<input bind:value={username} class="border p-1" name="username" type="text" required />
	</label>
	<label class="grid gap-2">
		<span>Password <span class="text-red-500">*</span></span>
		<input bind:value={password} class="border p-1" name="password" type="password" required />
	</label>
	<label class="grid gap-2">
		<span>Confirm Password <span class="text-red-500">*</span></span>
		<input bind:value={confirmPassword} class="border p-1" type="password" required />
		{#if confirmPassword !== '' && confirmPassword !== password}
			<span class="text-red-700">Passwords do not match</span>
		{/if}
	</label>
	<button class="mt-4 bg-black p-2 text-white" type="submit">Register</button>
</form>
