<script module>
	/** @typedef {Object} Props
	 * @property {number} [id]
	 * @property {string} [idName]
	 * @property {string} [label]
	 * @property {string} [name]
	 * @property {boolean} [readonly]
	 * @property {HTMLInputElement} [ref]
	 * @property {boolean} [required]
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
		required = false,
		value = $bindable('')
	} = $props();

	/** @type {HTMLDivElement} */
	let container;

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

	/** @type {(event: KeyboardEvent, elements: HTMLElement[]) => void} */
	function scrollElementsWithKeyboard(event, elements) {
		event.stopPropagation();

		if (event.key === 'Backspace') {
			return elements[0].focus();
		}

		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();

			let index = 0;

			if (document.activeElement instanceof HTMLElement) {
				index = elements.indexOf(document.activeElement);
			}

			if (event.key === 'ArrowDown') {
				elements[Math.min(index + 1, elements.length - 1)].focus();
			} else {
				elements[Math.max(index - 1, 0)].focus();
			}
		}
	}
</script>

<div
	bind:this={container}
	class="group relative bg-inherit"
	onkeydown={(event) => {
		scrollElementsWithKeyboard(
			event,
			Array.from(container.querySelectorAll('input[type="text"], button'))
		);
	}}
	role="listbox"
	tabindex="-1"
>
	<TextInput bind:ref bind:value oninput={query} {label} {name} {readonly} {required} />
	<input name={idName} type="hidden" value={id} />
	<ul
		class="absolute top-full right-0 left-0 z-10 hidden border border-t-0 bg-inherit"
		class:group-focus-within:block={results.length !== 0}
	>
		{#each results as result (result.id)}
			<li class="border-b last:border-none" role="listitem">
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
</div>
