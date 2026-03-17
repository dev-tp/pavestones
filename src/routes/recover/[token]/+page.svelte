<script>
	import ConfirmPassword from '$lib/components/ConfirmPassword.svelte';

	/** @type {import('./$types').PageProps} */
	const { form } = $props();

	/** @type {boolean} */
	let valid = $state(false);
</script>

<svelte:head>
	<title>Pavestones - Reset Password</title>
</svelte:head>

<div
	class="m-auto my-8 grid w-full gap-2 px-8 md:w-1/3 md:px-0"
	onsubmit={(event) => {
		event.preventDefault();

		if (!valid) {
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
		<ConfirmPassword bind:valid confirmLabel="Confirm new password" label="New password" />
		<div class="flex items-center gap-1">
			<button class="bg-black px-2 py-1 text-white" type="submit">Reset</button>
			<a class="px-2 py-1 hover:underline" href="/login">Cancel</a>
		</div>
	</form>
</div>
