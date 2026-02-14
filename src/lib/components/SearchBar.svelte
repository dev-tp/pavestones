<script module>
	/** @typedef {Object} Props
	 * @property {string} [class]
	 * @property {function(import('$lib/server/db/schema').Pavestone | undefined): void} onselect
	 */
</script>

<script>
	import { Search, X } from '@lucide/svelte';

	import { deserialize } from '$app/forms';

	/** @type {Props} */
	let { class: className, onselect } = $props();

	/** @type {HTMLFormElement} */
	let form;

	/** @type {string} */
	let query = $state('');

	/** @type {import('$lib/server/db/schema').Pavestone[]} */
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

<search class={['group border bg-white', className].join(' ')}>
	<form action="?/search" bind:this={form} class="p-1" onsubmit={handleSubmit}>
		<fieldset class="flex items-center gap-1">
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
		</fieldset>
	</form>
	<ul class="hidden max-h-96 overflow-auto group-focus-within:block">
		{#each results as result}
			<li class="border-t p-2 hover:bg-slate-200">
				<button
					class="w-full text-start"
					onclick={() => {
						query = result.dedicatedTo;
						onselect(result);
					}}
					tabindex="0"
				>
					<div>{result.dedicatedTo}</div>
					<div class="text-sm">{result.donor}</div>
				</button>
			</li>
		{/each}
		{#if query !== '' && results.length === 0}
			<li class="border-t p-2">No results</li>
		{/if}
	</ul>
</search>
