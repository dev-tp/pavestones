<script module>
	/** @typedef {Object} Props
	 * @property {import('$lib/server/db/schema').Pavestone} data
	 */
</script>

<script>
	import { X } from '@lucide/svelte';

	import { certificate } from '$lib/storage.svelte.js';

	/** @type {Props} */
	const { data } = $props();
</script>

<svelte:window
	onkeyup={(event) => {
		if (event.key === 'Escape') {
			certificate.open = false;
		}
	}}
/>

<div class="fixed inset-0 overflow-auto bg-white">
	<button
		class="fixed top-4 right-4 cursor-pointer print:hidden"
		onclick={() => (certificate.open = false)}
	>
		<X class="h-5 w-5" />
	</button>
	<div class="m-auto mb-4 h-[11in] w-[8.5in] p-[0.5in] shadow-xl">
		<img alt="logo" class="absolute h-24" />
		<div class="flex h-24 items-center justify-center">
			<div class="text-center">
				<p>Cathedral Pavestone designated for:</p>
				<p>{data.dedicatedTo}</p>
			</div>
		</div>
		<div class="mb-8 h-1/2 w-full border"></div>
		<div class="grid grid-cols-2 gap-8">
			<div>
				<p class="mb-4">
					Thank you for your gift to the Cathedral of Our Lady of the Angels. Your designated paving
					stone is an enduring symbol of faith and devotion. We sincerely appreciate your generosity
					and invite you to use this map of the Cathedral floor plan to locate your stone.
				</p>
				<p>
					Your stone is indicated by the red dot in the &quot;Enlarged Area.&quot; The image labeled
					&quot;Overall Plan&quot; shows the entire floor plan and the red rectangle indicated the
					area being enlarged.
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
