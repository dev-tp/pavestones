<script module>
	/** @typedef {Object} Props
	 * @property {import('$lib/server/db/schema').Pavestone} [data]
	 * @property {function(): void} [onclose]
	 */
</script>

<script>
	/** @type {Props} */
	const { data, onclose = () => {} } = $props();

	let isEditMode = $derived(!data || data.donor === '');
</script>

<form class="w-1/4 rounded-md bg-white px-6 pt-4 pb-4">
	<div class="grid gap-4">
		<label class="grid gap-2">
			<span class="text-sm">Donor</span>
			<input
				class="border p-1 read-only:border-slate-300"
				name="donor"
				readonly={!isEditMode}
				type="text"
				value={data?.donor}
			/>
		</label>
		<label class="grid gap-2">
			<span class="text-sm">Dedicated to</span>
			<input
				class="border p-1 read-only:border-slate-300"
				name="dedicated_to"
				readonly={!isEditMode}
				type="text"
				value={data?.dedicatedTo}
			/>
		</label>
		<label class="mb-4 flex gap-2">
			<input
				checked={data?.inMemoriam}
				class="cursor-pointer"
				disabled={!isEditMode}
				name="in_memoriam"
				type="checkbox"
			/>
			<span>In memoriam</span>
		</label>
	</div>
	<div class="flex justify-between">
		<div>
			{#if data?.donor}
				{#if isEditMode}
					<button
						class="cursor-pointer rounded-sm px-2 py-1 text-sm text-red-700 uppercase hover:bg-red-100"
						type="button"
					>
						Delete
					</button>
				{:else}
					<button
						class="cursor-pointer rounded-sm px-2 py-1 text-sm uppercase hover:bg-slate-100"
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
						if (!data || data.donor === '') {
							onclose();
						} else {
							isEditMode = false;
						}
					}}
					type="button"
				>
					Cancel
				</button>
			{:else}
				<button
					class="cursor-pointer rounded-sm px-2 py-1 text-sm uppercase hover:bg-slate-100"
					onclick={onclose}
					type="button"
				>
					Close
				</button>
				<button
					class="cursor-pointer rounded-sm px-2 py-1 text-sm uppercase hover:bg-slate-100"
					onclick={() => (isEditMode = true)}
					type="button"
				>
					Edit
				</button>
			{/if}
		</div>
	</div>
</form>
