<script module>
	/**
	 * @import { Data, Donor, Entry } from '$lib/server/db/schema'
	 *
	 * @typedef {Object} Props
	 * @property {Data} data
	 * @property {(data: Data) => void} [onupdate]
	 */
</script>

<script>
	import { deserialize } from '$app/forms';
	import { page } from '$app/state';
	import storage from '$lib/storage.svelte.js';
	import SelectDonor from './SelectDonor.svelte';
	import TextInput from './TextInput.svelte';

	/** @type {Props} */
	const { data = $bindable(), onupdate = () => {} } = $props();

	/** @type {HTMLFormElement} */
	let form;

	/** @type {HTMLInputElement | undefined} */
	let input = $state();

	/** @type {boolean} */
	let isEditMode = $derived(page.data.user && data.donor === null);

	/** @type {Pick<Donor, 'fullName'> & Pick<Entry, 'dedicatedTo' | 'inMemoriam'> & { donorId: number }} */
	let values = $state({
		donorId: data.donor?.id ?? 0,
		fullName: data.donor?.fullName ?? '',
		dedicatedTo: data.entry?.dedicatedTo ?? '',
		inMemoriam: !!data.entry?.inMemoriam
	});

	/** @param {'?/add' | '?/remove'} action */
	async function submit(action) {
		const response = await fetch(action, {
			body: new FormData(form),
			method: 'POST'
		});

		/** @type {import('@sveltejs/kit').ActionResult<{ records: Data[] }>} */
		const result = deserialize(await response.text());

		if (result.type === 'success') {
			if (action === '?/add' && result.data) {
				onupdate(result.data.records[0]);
			} else {
				onupdate({
					id: data.id,
					entryId: null,
					entry: null,
					donor: null
				});
			}

			storage.form.open = false;
		}
	}

	$effect(() => {
		if (isEditMode) {
			input?.focus();
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
	<div class="grid gap-4 bg-inherit">
		<SelectDonor
			bind:id={values.donorId}
			bind:ref={input}
			bind:value={values.fullName}
			readonly={!isEditMode}
		/>
		<TextInput
			bind:value={values.dedicatedTo}
			label="Dedicated to"
			name="dedicatedTo"
			readonly={!isEditMode}
		/>
		<label class="mb-4 flex items-center gap-2">
			<input
				bind:checked={values.inMemoriam}
				class="cursor-pointer"
				disabled={!isEditMode}
				name="inMemoriam"
				type="checkbox"
			/>
			<span>In memoriam</span>
		</label>
		<input name="id" type="hidden" value={data.id} />
	</div>
	<div class="flex justify-between">
		<div>
			{#if data.donor}
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
						if (!data.donor) {
							storage.form.open = false;
						} else {
							isEditMode = false;
							values.donorId = data.entry?.donorId ?? 0;
							values.fullName = data.donor?.fullName ?? '';
							values.dedicatedTo = data.entry?.dedicatedTo ?? '';
							values.inMemoriam = !!data.entry?.inMemoriam;
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
