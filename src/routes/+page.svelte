<script>
	import SearchBar from '$lib/components/SearchBar.svelte';

	const { data } = $props();
</script>

<SearchBar class="fixed top-2 right-0 left-0 m-auto w-1/4" />
<svg width={6901} height={5139}>
	{#each data.pavestones as pavestone}
		<path
			class:sold={pavestone.patron !== ''}
			d={pavestone.tile}
			onclick={() => alert(pavestone.id)}
			onkeydown={() => {}}
			role="button"
			tabindex="0"
		/>
	{/each}
</svg>
