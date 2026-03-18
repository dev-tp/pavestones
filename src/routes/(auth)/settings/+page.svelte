<script>
	import { page } from '$app/state';
	import TextInput from '$lib/components/TextInput.svelte';
</script>

<form class="grid gap-4">
	<h1 class="text-xl">Update Profile</h1>
	<TextInput label="Username" name="username" value={page.data.user.username} required />
	<button class="justify-self-start bg-black px-3 py-1 text-white" type="submit">Update</button>
</form>
