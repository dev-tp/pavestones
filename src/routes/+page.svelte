<script>
	import Form from '$lib/components/Form.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Pavestone from '$lib/components/Pavestone.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	const { data } = $props();

	/** @type {boolean} */
	let open = $state(false);

	/** @type {import('$lib/server/db/schema').Pavestone | undefined} */
	let selected = $state();
</script>

<SearchBar
	class="fixed top-2 right-0 left-0 m-auto w-9/10 md:w-1/4"
	onselect={(pavestone) => (selected = pavestone)}
/>

<main class="overflow-auto">
	<svg id="map" width={6901} height={5139}>
		{#await data.pavestones}
			<text x={100} y={100}>Loading...</text>
		{:then pavestones}
			{#each pavestones as pavestone}
				<Pavestone
					data={pavestone}
					onclick={() => {
						open = true;
						selected = pavestone;
					}}
					selected={pavestone.id === selected?.id}
				/>
			{/each}
		{/await}
	</svg>
</main>

{#if selected}
	<Modal
		bind:open
		class="fixed inset-0 items-center justify-center bg-black/60 backdrop-blur-sm md:flex"
	>
		<Form data={selected} onclose={() => (open = false)} />
	</Modal>
{/if}
