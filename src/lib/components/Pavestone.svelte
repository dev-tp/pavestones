<script module>
	/** @typedef {Object} Props
	 * @property {import('$lib/server/db/schema').Pavestone} data
	 * @property {function(MouseEvent): void} [onclick]
	 * @property {boolean} [selected]
	 */
</script>

<script>
	/** @type {Props} */
	const { data, onclick = () => {}, selected = false } = $props();

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
	class="cursor-pointer"
	class:selected
	class:sold={data.patron !== ''}
	d={data.tile}
	onkeydown={() => {}}
	role="button"
	tabindex="0"
	{onclick}
/>
