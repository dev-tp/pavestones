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
	import TextInput from './TextInput.svelte';

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

<TextInput class="group" bind:value={password} type="password" {label} {name} {required}>
	<ul class="list-inside list-disc group-focus-within:block" class:hidden={password === ''}>
		{#each validate.password(password) as error}
			<li>{error}</li>
		{/each}
	</ul>
</TextInput>
<TextInput
	bind:value={confirmPassword}
	error={confirmPassword !== '' && confirmPassword !== password ? 'Passwords do not match' : ''}
	label={confirmLabel}
	type="password"
	{required}
/>
