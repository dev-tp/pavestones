<script module>
	/**
	 * @import { Data } from '$lib/server/db/schema'
	 *
	 * @typedef {Object} Props
	 * @property {string} [class]
	 * @property {(id: number | undefined) => void} onselect
	 */
</script>

<script>
	import { deserialize } from '$app/forms';
	import Icon from './Icon.svelte';

	/** @type {Props} */
	const { class: className, onselect } = $props();

	/** @type {HTMLElement} */
	let container;

	/** @type {HTMLFormElement} */
	let form;

	/** @type {string} */
	let query = $state('');

	/** @type {Data[]} */
	let results = $state([]);

	/** @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}} event */
	async function handleSubmit(event) {
		event.preventDefault();

		if (query === '') {
			onselect(undefined);
			results = [];
			return;
		}

		const response = await fetch(event.currentTarget.action, {
			body: new FormData(event.currentTarget, event.submitter),
			method: 'POST'
		});

		/** @type {import('@sveltejs/kit').ActionResult<{ results: Data[] }>} */
		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			results = result.data.results;
		}
	}
</script>

<search
	bind:this={container}
	class={['group bg-white', className].join(' ')}
	onkeydown={(event) => {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();

			const nodes = /** @type {HTMLElement[]} */ (
				Array.from(container.querySelectorAll('input, button'))
			);

			let index = 0;

			if (document.activeElement instanceof HTMLElement) {
				index = nodes.indexOf(document.activeElement);
			}

			if (event.key === 'ArrowDown') {
				nodes[Math.min(index + 1, nodes.length - 1)].focus();
			} else {
				nodes[Math.max(index - 1, 0)].focus();
			}
		}
	}}
	role="searchbox"
	tabindex="-1"
>
	<form
		action="?/search"
		bind:this={form}
		class="flex items-center gap-1 border bg-inherit p-1"
		onsubmit={handleSubmit}
	>
		<button
			class="flex h-7 w-7 items-center justify-center rounded-full hover:cursor-pointer hover:bg-slate-100"
			type="submit"
		>
			<Icon name="search" class="h-5 w-5" />
		</button>
		<input
			bind:value={query}
			class="grow outline-none"
			name="query"
			onkeyup={() => form.requestSubmit()}
			placeholder="Search"
			type="search"
		/>
		{#if query !== ''}
			<button
				class="flex h-7 w-7 items-center justify-center rounded-full hover:cursor-pointer hover:bg-slate-100"
				onclick={() => {
					onselect(undefined);
					query = '';
					results = [];
				}}
				type="button"
			>
				<Icon name="x" class="h-5 w-5" />
			</button>
		{/if}
	</form>
	<ul
		class="hidden max-h-96 overflow-auto border border-t-0 bg-inherit"
		class:group-focus-within:block={query !== ''}
	>
		{#each results as result}
			<li class="border-t p-2 first:border-0 hover:bg-slate-200">
				<button
					class="w-full cursor-pointer text-start"
					onclick={(event) => {
						event.currentTarget.blur();
						query = result.entry?.dedicatedTo ?? '';
						onselect(result.id);
					}}
					tabindex="0"
				>
					<div>{result.entry?.dedicatedTo}</div>
					<div class="text-sm">{result.entry?.donor?.fullName}</div>
				</button>
			</li>
		{/each}
		{#if query !== '' && results.length === 0}
			<li class="p-2">No results</li>
		{/if}
	</ul>
</search>
