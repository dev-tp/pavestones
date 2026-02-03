<script>
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
	class="fixed top-2 right-0 left-0 m-auto w-1/4"
	onselect={(pavestone) => (selected = pavestone)}
/>

<svg id="map" width={6901} height={5139}>
	{#each data.pavestones as pavestone}
		<Pavestone
			data={pavestone}
			onclick={() => {
				open = true;
				selected = pavestone;
			}}
			selected={pavestone.id === selected?.id}
		/>
	{/each}
</svg>

<Modal bind:open />
