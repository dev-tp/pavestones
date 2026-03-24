<script module>
	/** @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 * @property {string} [class]
	 * @property {string} [error]
	 * @property {string} label
	 * @property {string} [name]
	 * @property {import('svelte/elements').FormEventHandler<HTMLInputElement> | null} [oninput]
	 * @property {boolean} [readonly]
	 * @property {HTMLInputElement} [ref]
	 * @property {boolean} [required]
	 * @property {'email' | 'password' | 'text'} [type]
	 * @property {string} [value]
	 */
</script>

<script>
	/** @type {Props} */
	let {
		children,
		class: className = '',
		error,
		label,
		name,
		oninput,
		readonly = false,
		ref = $bindable(),
		required = false,
		type = 'text',
		value = $bindable('')
	} = $props();
</script>

<label class={['grid gap-2', className].filter((item) => !!item).join(' ')}>
	<span>
		{label}
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</span>
	<input
		bind:this={ref}
		bind:value
		class="border p-1 read-only:border-slate-300"
		{name}
		{oninput}
		{readonly}
		{required}
		{type}
	/>
	{#if error}
		<span class="text-red-500">{error}</span>
	{/if}
	{@render children?.()}
</label>
