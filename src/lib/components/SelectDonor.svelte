<script module>
	/** @typedef {Object} Props
	 * @property {number} [id]
	 * @property {string} [idName]
	 * @property {string} [label]
	 * @property {string} [name]
	 * @property {boolean} [readonly]
	 * @property {HTMLInputElement} [ref]
	 * @property {string} [value]
	 */
</script>

<script>
	import TextInput from './TextInput.svelte';

	/** @type {Props} */
	let {
		id = $bindable(0),
		idName = 'donorId',
		label = 'Donor',
		name = 'fullName',
		readonly = false,
		ref = $bindable(),
		value = $bindable('')
	} = $props();

	/** @type {import('$lib/server/db/schema').Donor[]} */
	let results = $state([]);

	async function query() {
		if (value === '') {
			id = 0;
			results = [];
			return;
		}

		const response = await fetch(`/api/donors?q=${value}`);

		results = await response.json();
	}
</script>

<TextInput
	bind:ref
	bind:value
	class="group relative bg-inherit"
	oninput={query}
	{label}
	{name}
	{readonly}
>
	<input name={idName} type="hidden" value={id} />
	<ul
		class="absolute top-full right-0 left-0 z-10 hidden border border-t-0 bg-inherit"
		class:group-focus-within:block={results.length !== 0}
	>
		{#each results as result (result.id)}
			<li class="border-b last:border-none">
				<button
					class="w-full cursor-pointer p-1 text-start hover:bg-slate-200"
					onclick={(event) => {
						id = result.id;
						value = result.fullName;
						event.currentTarget.blur();
					}}
					type="button"
				>
					{result.fullName}
				</button>
			</li>
		{/each}
	</ul>
</TextInput>
