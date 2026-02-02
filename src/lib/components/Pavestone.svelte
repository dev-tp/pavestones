<script module>
	/** @typedef {Object} Props
	 * @property {import('$lib/server/db/schema').Pavestone} data
	 * @property {boolean} [selected]
	 */
</script>

<script>
	/** @type {Props} */
	const { data, selected = false } = $props();

	/** @type {SVGPathElement} */
	let path;

	$effect(() => {
		if (selected) {
			path.focus();
		}
	});
</script>

<path
	bind:this={path}
	class:selected
	class:sold={data.patron !== ''}
	d={data.tile}
	onclick={() => alert(data.id)}
	onkeydown={() => {}}
	role="button"
	tabindex="0"
/>
