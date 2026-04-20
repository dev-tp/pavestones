<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import TextInput from '$lib/components/TextInput.svelte';
	import Toasts from '$lib/components/Toasts.svelte';
	import validate from '$lib/validate';

	/** @type {string[]} */
	let messages = $state([]);

	/** @type {string} */
	let email = $derived(page.data.user.email);
</script>

<svelte:head>
	<title>Pavestones - Settings</title>
</svelte:head>

<Toasts bind:messages />

<form
	class="grid gap-4"
	method="POST"
	use:enhance={({ cancel }) => {
		if (!validate.email(email)) {
			cancel();
		}

		return async ({ result, update }) => {
			await update({ invalidateAll: true, reset: false });

			if (result.status === 200) {
				messages.push('Email was updated!');
			}
		};
	}}
>
	<h1 class="text-xl">Email</h1>
	<p>
		Add or change the email address associated with your account by submitting a new one below. This
		will update the email you use to login as well as the one we send emails to.
	</p>
	<TextInput
		bind:value={email}
		error={!validate.email(email) ? 'Invalid email' : ''}
		label="Email"
		name="email"
		required
		type="email"
	/>
	<div>
		<button
			class="cursor-pointer bg-black px-3 py-1 text-white disabled:cursor-default disabled:opacity-50"
			disabled={email === page.data.user.email}
			type="submit"
		>
			Update
		</button>
		{#if email !== page.data.user.email}
			<button
				class="cursor-pointer px-3 py-1 hover:underline"
				onclick={() => (email = page.data.user.email)}
				type="button"
			>
				Reset
			</button>
		{/if}
	</div>
</form>
