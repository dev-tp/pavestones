<script>
	import { enhance } from '$app/forms';
	import ConfirmPassword from '$lib/components/ConfirmPassword.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Toasts from '$lib/components/Toasts.svelte';

	/** @type {string} */
	let currentPassword = $state('');

	/** @type {string[]} */
	let messages = $state([]);

	/** @type {string} */
	let newPassword = $state('');

	/** @type {boolean} */
	let valid = $state(false);
</script>

<svelte:head>
	<title>Pavestones - Settings</title>
</svelte:head>

<Toasts bind:messages />

<form
	class="grid gap-4"
	method="POST"
	use:enhance={({ cancel }) => {
		if (currentPassword === '' || currentPassword === newPassword || !valid) {
			cancel();
		}

		return async ({ result, update }) => {
			await update({ invalidateAll: true, reset: true });

			if (result.status === 200) {
				messages.push('Password was updated!');
			}
		};
	}}
>
	<h1 class="text-xl">Change Password</h1>
	<p>Change your password by entering your old password and creating a new one.</p>
	<TextInput
		bind:value={currentPassword}
		label="Current password"
		name="currentPassword"
		required
		type="password"
	/>
	<ConfirmPassword
		bind:password={newPassword}
		bind:valid
		confirmLabel="Confirm new password"
		label="New password"
	/>
	<button class="justify-self-start bg-black px-3 py-1 text-white" type="submit">Update</button>
</form>
