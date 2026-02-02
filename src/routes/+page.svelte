<script>
	import Pavestone from '$lib/components/Pavestone.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	const { data } = $props();

	let selected = $state(0);
</script>

<SearchBar class="fixed top-2 right-0 left-0 m-auto w-1/4" onselect={(id) => (selected = id)} />
<svg id="map" width={6901} height={5139}>
	{#each data.pavestones as pavestone}
		<Pavestone data={pavestone} selected={pavestone.id === selected} />
	{/each}
</svg>
