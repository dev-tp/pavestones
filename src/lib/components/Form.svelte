<script module>
	/** @typedef {Object} Props
	 * @property {import('$lib/server/db/schema').Pavestone} data
	 */
</script>

<script>
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import storage from '$lib/storage.svelte.js';

	/** @type {Props} */
	const { data = $bindable() } = $props();

	/** @type {HTMLFormElement} */
	let form;

	/** @type {HTMLInputElement} */
	let input;

	/** @type {boolean} */
	let isEditMode = $derived(page.data.user && data.donor === '');

	/** @type {import('$lib/server/db/schema').Pavestone} */
	let values = $state({ ...data });

	/** @param {'?/add' | '?/remove'} action */
	async function submit(action) {
		const response = await fetch(action, {
			body: new FormData(form),
			method: 'POST'
		});

		/** @type {import('@sveltejs/kit').ActionResult} */
		const result = deserialize(await response.text());

		if (result.type === 'success') {
			invalidateAll();
			storage.form.open = false;
		}
	}

	$effect(() => {
		if (isEditMode) {
			input.focus();
		}
	});
</script>

<form
	bind:this={form}
	class="w-full rounded-none bg-white px-6 pt-4 pb-4 md:w-1/4 md:rounded-md"
	onsubmit={(event) => {
		event.preventDefault();

		if (!page.data.user) {
			return;
		}

		submit('?/add');
	}}
>
	<div class="grid gap-4">
		<label class="grid gap-2">
			<span class="text-sm">Donor</span>
			<input
				bind:this={input}
				bind:value={values.donor}
				class="border p-1 read-only:border-slate-300"
				name="donor"
				readonly={!isEditMode}
				type="text"
			/>
		</label>
		<label class="grid gap-2">
			<span class="text-sm">Dedicated to</span>
			<input
				bind:value={values.dedicatedTo}
				class="border p-1 read-only:border-slate-300"
				name="dedicated_to"
				readonly={!isEditMode}
				type="text"
			/>
		</label>
		<label class="mb-4 flex items-center gap-2">
			<input
				bind:checked={values.inMemoriam}
				class="cursor-pointer"
				disabled={!isEditMode}
				name="in_memoriam"
				type="checkbox"
			/>
			<span>In memoriam</span>
		</label>
		<input name="id" type="hidden" value={data.id} />
	</div>
	<div class="flex justify-between">
		<div>
			{#if data.donor !== ''}
				{#if isEditMode}
					<button
						class="cursor-pointer rounded-sm px-2 py-1 text-sm text-red-700 uppercase hover:bg-red-100"
						onclick={() => {
							if (confirm('Are you sure you want to delete this entry?')) {
								submit('?/remove');
							}
						}}
						type="button"
					>
						Delete
					</button>
				{:else}
					<button
						class="cursor-pointer rounded-sm px-2 py-1 text-sm uppercase hover:bg-slate-100"
						onclick={() => (storage.certificate.open = true)}
						type="button"
					>
						Print
					</button>
				{/if}
			{/if}
		</div>
		<div class="flex gap-2">
			{#if isEditMode}
				<button
					class="cursor-pointer rounded-sm px-2 py-1 text-sm uppercase hover:bg-slate-100"
					type="submit"
				>
					Save
				</button>
				<button
					class="cursor-pointer rounded-sm px-2 py-1 text-sm uppercase hover:bg-slate-100"
					onclick={() => {
						if (data.donor === '') {
							storage.form.open = false;
						} else {
							isEditMode = false;
							values = { ...data };
						}
					}}
					type="button"
				>
					Cancel
				</button>
			{:else}
				{#if page.data.user}
					<button
						class="cursor-pointer rounded-sm px-2 py-1 text-sm uppercase hover:bg-slate-100"
						onclick={() => (isEditMode = true)}
						type="button"
					>
						Edit
					</button>
				{/if}
				<button
					class="cursor-pointer rounded-sm px-2 py-1 text-sm uppercase hover:bg-slate-100"
					onclick={() => (storage.form.open = false)}
					type="button"
				>
					Close
				</button>
			{/if}
		</div>
	</div>
</form>
