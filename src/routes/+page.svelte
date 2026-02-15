<script>
	import Certificate from '$lib/components/Certificate.svelte';
	import Form from '$lib/components/Form.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Pavestone from '$lib/components/Pavestone.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import storage from '$lib/storage.svelte.js';

	/** @type {import('./$types').PageProps} */
	const { data } = $props();

	/** @type {import('$lib/server/db/schema').Pavestone | undefined} */
	let selected = $state();
</script>

<SearchBar
	class="fixed top-4 right-0 left-0 m-auto w-[calc(100%-2rem)] md:w-1/4"
	onselect={(pavestone) => (selected = pavestone)}
/>

<main class="overflow-auto">
	<svg id="map" width={6901} height={5139}>
		{#await data.pavestones}
			<text x={20} y={100}>Loading...</text>
		{:then pavestones}
			{#each pavestones as pavestone}
				<Pavestone
					data={pavestone}
					onclick={() => {
						selected = pavestone;
						storage.form.open = true;
					}}
					selected={pavestone.id === selected?.id}
				/>
			{/each}
		{/await}
	</svg>
</main>

<div class="fixed bottom-4 left-4">
	{#if !data.user}
		<a href="/login">Login</a>
	{:else}
		<form action="/logout" method="POST">
			<button class="cursor-pointer" type="submit">Logout</button>
		</form>
	{/if}
</div>

{#if selected}
	{#if storage.certificate.open}
		<Certificate data={selected} />
	{:else}
		<Modal
			bind:open={storage.form.open}
			class="fixed inset-0 items-center justify-center bg-black/60 backdrop-blur-sm md:flex"
		>
			<Form data={selected} />
		</Modal>
	{/if}
{/if}
