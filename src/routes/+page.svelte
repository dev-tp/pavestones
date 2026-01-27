<script>
	const { data } = $props();
</script>

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
