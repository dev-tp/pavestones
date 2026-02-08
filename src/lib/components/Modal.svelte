<script module>
	/** @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 * @property {string} [class]
	 * @property {boolean} open
	 */
</script>

<script>
	import { X } from '@lucide/svelte';

	/** @type {Props} */
	let {
		children,
		class: className = 'fixed inset-0 bg-black/60',
		open = $bindable(false)
	} = $props();
</script>

<svelte:window
	onkeyup={(event) => {
		if (event.key === 'Escape') {
			open = false;
		}
	}}
/>

{#if open}
	<div class={className}>
		<button
			class="fixed top-4 right-4 hidden cursor-pointer text-white md:block"
			onclick={() => (open = false)}
		>
			<X class="h-5 w-5" />
		</button>
		{@render children?.()}
	</div>
{/if}
