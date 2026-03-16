<script>
	import ConfirmPassword from '$lib/components/ConfirmPassword.svelte';
	import validate from '$lib/validate';

	/** @type {import('./$types').PageProps} */
	const { form } = $props();

	/** @type {string} */
	let password = $state('');
</script>

<svelte:head>
	<title>Pavestones - Reset Password</title>
</svelte:head>

<div
	class="m-auto my-8 grid w-full gap-2 px-8 md:w-1/3 md:px-0"
	onsubmit={(event) => {
		event.preventDefault();

		if (validate.password(password).length > 0) {
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
		<ConfirmPassword
			bind:password
			label="New password"
			confirmLabel="Confirm new password"
		/>
		<div class="flex items-center gap-1">
			<button class="bg-black px-2 py-1 text-white" type="submit">Reset</button>
			<a class="px-2 py-1 hover:underline" href="/login">Cancel</a>
		</div>
	</form>
</div>
