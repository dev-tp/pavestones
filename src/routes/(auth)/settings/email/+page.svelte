<script>
	import { page } from '$app/state';
	import TextInput from '$lib/components/TextInput.svelte';
</script>

<form class="grid gap-4">
	<h1 class="text-xl">Email</h1>
	<p>
		Add or change the email address associated with your account by submitting a new one below. This
		will update the email you use to login as well as the one we send emails to.
	</p>
	<TextInput label="Email" name="email" type="email" value={page.data.user.email} required />
	<button class="justify-self-start bg-black px-3 py-1 text-white" type="submit">Update</button>
</form>
