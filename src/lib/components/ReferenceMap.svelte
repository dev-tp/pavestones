<script module>
	/** @typedef {Object} Props
	 * @property {string} [class]
	 * @property {number} x
	 * @property {number} y
	 */
</script>

<script>
	import { onMount } from 'svelte';

	import referenceMap from '$lib/assets/reference-map.png';

	/** @type {Props} */
	const { class: className, x, y } = $props();

	/** @type {HTMLImageElement} */
	let image;

	/** @type {number} */
	let scaledX = $derived(Math.abs(x / 7000));

	/** @type {number} */
	let scaledY = $derived(Math.abs(y / 5500));

	onMount(() => {
		image.onload = () => {
			scaledX *= image.offsetWidth;
			scaledY *= image.offsetHeight;
		};
	});
</script>

<div class={className}>
	<div class="relative">
		<div class="absolute h-4 w-4 bg-red-500" style="left:{scaledX}px;top:{scaledY}px;"></div>
		<img alt="Reference Map" bind:this={image} src={referenceMap} />
	</div>
</div>
