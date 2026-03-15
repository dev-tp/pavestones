<script module>
	/**
	 * @typedef {'printer' | 'search' | 'x'} Icon
	 *
	 * @typedef {Object} Props
	 * @property {string} [class]
	 * @property {Icon} name
	 */
</script>

<script>
	import { Printer, Search, X } from '@lucide/svelte';

	/** @type {Props} */
	const { class: className, name } = $props();

	const Icon = $derived.by(() => {
		switch (name) {
			case 'printer':
				return Printer;
			case 'search':
				return Search;
			case 'x':
				return X;
		}
	});
</script>

<Icon class={className} />
