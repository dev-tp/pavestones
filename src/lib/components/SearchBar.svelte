<script>
	import { Search, X } from '@lucide/svelte';

	import { deserialize } from '$app/forms';

	const { class: className } = $props();

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

<search class={['border bg-white', className].join(' ')}>
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
	<ul class="max-h-96 overflow-auto">
		{#each results as result}
			<li class="border-t p-2 hover:bg-slate-200">
				<button class="w-full text-start" onclick={() => alert(result.id)}>
					<div>{result.dedication}</div>
					<div class="text-sm">{result.patron}</div>
				</button>
			</li>
		{/each}
		{#if query !== '' && results.length === 0}
			<li class="border-t p-2">No results</li>
		{/if}
	</ul>
</search>
