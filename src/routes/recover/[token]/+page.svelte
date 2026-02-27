<script>
	import validate from '$lib/validate';

	/** @type {import('./$types').PageProps} */
	const { form } = $props();

	/** @type {string} */
	let password = $state('');

	/** @type {string} */
	let confirmPassword = $state('');
</script>

<svelte:head>
	<title>Pavestones - Reset Password</title>
</svelte:head>

<div
	class="m-auto my-8 grid w-full gap-2 px-4 md:w-1/3 md:px-0"
	onsubmit={(event) => {
		event.preventDefault();

		if (validate.password(password).length > 0 || password !== confirmPassword) {
			return;
		}

		if (event.target instanceof HTMLFormElement) {
			event.target.submit();
		}
	}}
>
	<h1 class="text-3xl">Reset password</h1>
	<form class="grid gap-4" method="POST">
		{#if form?.error}
			<span class="text-red-500">{form.error}</span>
		{/if}
		<label class="group grid gap-1">
			<span>New password <span class="text-red-500">*</span></span>
			<input bind:value={password} class="border p-1" name="password" type="password" required />
			<ul class="list-inside list-disc group-focus-within:block" class:hidden={password === ''}>
				{#each validate.password(password) as error}
					<li>{error}</li>
				{/each}
			</ul>
		</label>
		<label class="grid gap-1">
			<span>Confirm new password <span class="text-red-500">*</span></span>
			<input bind:value={confirmPassword} class="border p-1" type="password" required />
			{#if confirmPassword !== '' && password !== confirmPassword}
				<span class="text-red-500">Passwords do not match</span>
			{/if}
		</label>
		<div class="flex items-center gap-1">
			<button class="bg-black px-2 py-1 text-white" type="submit">Reset</button>
			<a class="px-2 py-1 hover:underline" href="/login">Cancel</a>
		</div>
	</form>
</div>
