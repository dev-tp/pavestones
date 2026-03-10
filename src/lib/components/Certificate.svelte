<script module>
	/** @typedef {Object} Props
	 * @property {import('$lib/server/db/schema').Data} data
	 * @property {{x: number, y: number}} position
	 */
</script>

<script>
	import { Printer, X } from '@lucide/svelte';
	import { onMount } from 'svelte';

	import logo from '$lib/assets/logo.svg';
	import referenceMap from '$lib/assets/reference-map.png';
	import { certificate } from '$lib/storage.svelte.js';

	/** @type {Props} */
	const { data, position } = $props();

	/** @type {SVGElement} */
	let container;

	/** @type {number} */
	let x = $state(0);

	/** @type {number} */
	let y = $state(0);

	onMount(() => {
		const rectangle = container.getBoundingClientRect();

		x = rectangle.width / 2 - position.x;
		y = rectangle.height / 2 - position.y;
	});
</script>

<svelte:window
	onkeyup={(event) => {
		if (event.key === 'Escape') {
			certificate.open = false;
		}
	}}
/>

<div class="fixed inset-0 overflow-auto bg-white">
	<div class="fixed top-4 right-4 flex cursor-pointer gap-4 print:hidden">
		<button class="cursor-pointer" onclick={() => window.print()}>
			<Printer class="h-5 w-5" />
		</button>
		<button class="cursor-pointer" onclick={() => (certificate.open = false)}>
			<X class="h-5 w-5" />
		</button>
	</div>
	<div class="m-auto mb-4 h-[11in] w-[8.5in] p-[0.5in] shadow-xl">
		<img alt="Cathedral Logo" class="absolute h-24" src={logo} />
		<div class="mb-8 flex h-24 items-center justify-center">
			<div class="text-center">
				<p>Cathedral Pavestone designated for:</p>
				<p>{data.entry?.dedicatedTo}</p>
			</div>
		</div>
		<div class="relative mb-8 h-1/2 w-full border">
			<svg bind:this={container} class="h-full w-full">
				<use href="#map" {x} {y} />
			</svg>
			<div class="absolute right-0 bottom-0 h-1/3 w-1/3 border-t border-l bg-white">
				<img class="m-auto h-full" alt="Mini Floor Plan" src={referenceMap} />
			</div>
		</div>
		<div class="grid grid-cols-2 gap-8">
			<div>
				<p class="mb-4">
					Thank you for your gift to the Cathedral of Our Lady of the Angels. Your designated paving
					stone is an enduring symbol of faith and devotion. We sincerely appreciate your generosity
					and invite you to use this map of the Cathedral floor plan to locate your stone.
				</p>
				<p>
					Your pavestone is indicated in yellow inside the &quot;Enlarged Area.&quot; The image
					labeled &quot;Overall Plan&quot; shows the entire floor plan and the red rectangle
					indicated the area being enlarged.
				</p>
			</div>
			<ul class="list-[upper-latin] columns-2">
				<li>Grand Doors</li>
				<li>South Ambulatory</li>
				<li>Baptismal Font</li>
				<li>Main Aisle</li>
				<li>Altar</li>
				<li>Organ Chancel</li>
				<li>North Doors</li>
				<li>North Ambulatory</li>
			</ul>
		</div>
	</div>
</div>
