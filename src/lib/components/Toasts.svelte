<script module>
	/** @typedef {Object} Props
	 * @property {string[]} messages
	 */
</script>

<script>
	import Icon from './Icon.svelte';

	/** @type {Props} */
	const { messages = $bindable() } = $props();
</script>

{#each messages as message}
	<div class="fixed right-4 bottom-4 flex min-w-72 bg-black p-4 text-white shadow-md">
		<div class="grow">
			<p>{message}</p>
		</div>
		<button class="cursor-pointer" onclick={() => messages.pop()}>
			<Icon class="h-4 w-4" name="x" />
		</button>
	</div>
	<p class="hidden">{setTimeout(() => messages.pop(), 1000)}</p>
{/each}
