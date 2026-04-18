<script>
	import { page } from '$app/state';
	import TextInput from '$lib/components/TextInput.svelte';
	import validate from '$lib/validate';

	const { form } = $props();

	let email = $derived(form ? form.email : page.data.user.email);
</script>

<svelte:head>
	<title>Pavestones - Settings</title>
</svelte:head>

<form
	class="grid gap-4"
	method="POST"
	onsubmit={(event) => {
		if (!validate.email(email)) {
			event.preventDefault();
		}
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
		<button class="cursor-pointer bg-black px-3 py-1 text-white" type="submit">Update</button>
		<button
			class="cursor-pointer px-3 py-1 hover:underline"
			onclick={() => (email = form ? form.email : page.data.user.email)}
			type="button">Reset</button
		>
	</div>
</form>
