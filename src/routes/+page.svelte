<script>
	const { data } = $props();
</script>

<svg width={6901} height={5139}>
	{#each data.pavestones as pavestone}
		<path
			d={pavestone.tile}
			onclick={() => alert(pavestone.id)}
			onkeydown={() => {}}
			role="button"
			tabindex="0"
		/>
	{/each}
</svg>

<style>
	path {
		fill-opacity: 0;
		stroke: black;
	}
	path:hover {
		fill-opacity: 1;
	}
</style>
