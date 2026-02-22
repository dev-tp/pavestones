<script module>
	/**
	 * @import { Data } from '$lib/server/db/schema'
	 *
	 * @typedef {Object} Props
	 * @property {string} [class]
	 * @property {(pavestone: Data | undefined) => void} onselect
	 */
</script>

<script>
	import { Search, X } from '@lucide/svelte';

	import { deserialize } from '$app/forms';

	/** @type {Props} */
	const { class: className, onselect } = $props();

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

		/** @type {import('@sveltejs/kit').ActionResult} */
		const result = deserialize(await response.text());

		if (result.type === 'success') {
			results = result.data?.results;
		}
	}
</script>

<search class={['group bg-white', className].join(' ')}>
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
			<Search class="h-5 w-5" />
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
				<X class="h-5 w-5" />
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
					class="w-full text-start"
					onclick={() => {
						query = result.entry?.dedicatedTo ?? '';
						onselect(result);
					}}
					tabindex="0"
				>
					<div>{result.entry?.dedicatedTo}</div>
					<div class="text-sm">{result.donor?.fullName}</div>
				</button>
			</li>
		{/each}
		{#if query !== '' && results.length === 0}
			<li class="p-2">No results</li>
		{/if}
	</ul>
</search>
