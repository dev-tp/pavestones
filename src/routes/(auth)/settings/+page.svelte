<script>
	import { page } from '$app/state';
	import TextInput from '$lib/components/TextInput.svelte';
	import validate from '$lib/validate';

	const { form } = $props();

	let username = $derived(form ? form.username : page.data.user.username);
</script>

<svelte:head>
	<title>Pavestones - Settings</title>
</svelte:head>

<form
	class="grid gap-4"
	method="POST"
	onsubmit={(event) => {
		if (!validate.username(username)) {
			event.preventDefault();
		}
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
		<button class="cursor-pointer bg-black px-3 py-1 text-white" type="submit">Update</button>
		<button
			class="cursor-pointer px-3 py-1 hover:underline"
			onclick={() => (username = form ? form.username : page.data.user.username)}
			type="button">Reset</button
		>
	</div>
</form>
