<script module>
	/** @typedef {Object} Props
	 * @property {string} [confirmLabel]
	 * @property {string} [label]
	 * @property {string} [name]
	 * @property {string} password
	 * @property {boolean} [required]
	 */
</script>

<script>
	import validate from '$lib/validate';

	/** @type {Props} */
	let {
		confirmLabel = 'Confirm password',
		label = 'Password',
		name = 'password',
		password = $bindable(),
		required = true
	} = $props();

	let confirmPassword = $state('');
</script>

<label class="group grid gap-2">
	<span>
		{label}
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</span>
	<input bind:value={password} class="border p-1" {name} type="password" {required} />
	<ul class="list-inside list-disc group-focus-within:block" class:hidden={password === ''}>
		{#each validate.password(password) as error}
			<li>{error}</li>
		{/each}
	</ul>
</label>
<label class="grid gap-2">
	<span>
		{confirmLabel}
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</span>
	<input bind:value={confirmPassword} class="border p-1" type="password" {required} />
	{#if confirmPassword !== '' && confirmPassword !== password}
		<span class="text-red-500">Passwords do not match</span>
	{/if}
</label>
