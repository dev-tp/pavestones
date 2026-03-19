<script module>
	/**
	 * @typedef {'at-sign' | 'key-round' | 'printer' | 'search' | 'user' | 'x'} Icon
	 *
	 * @typedef {Object} Props
	 * @property {string} [class]
	 * @property {Icon} name
	 */
</script>

<script>
	import { AtSign, KeyRound, Printer, Search, User, X } from '@lucide/svelte';

	/** @type {Props} */
	const { class: className, name } = $props();

	const Icon = $derived.by(() => {
		switch (name) {
			case 'at-sign':
				return AtSign;
			case 'key-round':
				return KeyRound;
			case 'printer':
				return Printer;
			case 'search':
				return Search;
			case 'user':
				return User;
			case 'x':
				return X;
		}
	});
</script>

<Icon class={className} />
