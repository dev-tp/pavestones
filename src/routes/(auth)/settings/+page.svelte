<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import TextInput from '$lib/components/TextInput.svelte';
	import Toasts from '$lib/components/Toasts.svelte';
	import validate from '$lib/validate';

	/** @type {string[]} */
	let messages = $state([]);

	/** @type {string} */
	let username = $derived(page.data.user.username);
</script>

<svelte:head>
	<title>Pavestones - Settings</title>
</svelte:head>

<Toasts bind:messages />

<form
	class="grid gap-4"
	method="POST"
	use:enhance={({ cancel }) => {
		if (!validate.username(username)) {
			cancel();
		}

		return async ({ result, update }) => {
			await update({ invalidateAll: true, reset: false });

			if (result.status === 200) {
				messages.push('Username was updated!');
			}
		};
	}}
>
	<h1 class="text-xl">Update Profile</h1>
	<TextInput
		bind:value={username}
		error={!validate.username(username) ? 'Invalid username' : ''}
		label="Username"
		name="username"
		required
	/>
	<div>
		<button
			class="cursor-pointer bg-black px-3 py-1 text-white disabled:cursor-default disabled:opacity-50"
			disabled={username === page.data.user.username}
			type="submit"
		>
			Update
		</button>
		{#if username !== page.data.user.username}
			<button
				class="cursor-pointer px-3 py-1 hover:underline"
				onclick={() => (username = page.data.user.username)}
				type="button"
			>
				Reset
			</button>
		{/if}
	</div>
</form>
