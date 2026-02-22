<script module>
	/** @typedef {Object} Props
	 * @property {import('$lib/server/db/schema').Data} data
	 * @property {(event: MouseEvent) => void} [onclick]
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
	class:cyan={data.sectionId === 1}
	class:green={data.sectionId === 2}
	class:magenta={data.sectionId === 3}
	class:purple={data.sectionId === 4}
	class:rose={data.sectionId === 5}
	class:selected
	class:sold={data.donor}
	d={data.tile}
	onkeydown={() => {}}
	role="button"
	tabindex="0"
	{onclick}
/>
