<script>
	import TextInput from '$lib/components/TextInput.svelte';

	/** @type {import('./$types').PageProps} */
	const { form } = $props();
</script>

<svelte:head>
	<title>Pavestones - Login</title>
</svelte:head>

<form class="grid w-full gap-2 p-8 md:m-auto md:w-1/3 md:px-0" method="POST">
	<h1 class="text-3xl"><a href="/">Pavestones</a></h1>
	{#if form && form.error !== ''}
		<p class="text-red-500">{form.error}</p>
	{/if}
	<TextInput label="Email" name="email" type="email" value={form ? form.email : ''} required />
	<TextInput label="Password" name="password" type="password" required />
	<div>
		<a class="hover:underline" href="/recover">Forgot password?</a>
	</div>
	<button class="mt-4 bg-black p-2 text-white" type="submit">Login</button>
</form>
