<script>
	import ConfirmPassword from '$lib/components/ConfirmPassword.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let currentPassword = $state('');
	let newPassword = $state('');
	let valid = $state(false);
</script>

<form
	class="grid gap-4"
	onsubmit={(event) => {
		if (currentPassword === '' || currentPassword === newPassword || !valid) {
			event.preventDefault();
		}
	}}
	method="POST"
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
