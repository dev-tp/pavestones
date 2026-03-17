<script module>
	/** @typedef {Object} Props
	 * @property {string} [confirmLabel]
	 * @property {string} [label]
	 * @property {string} [name]
	 * @property {string} [password]
	 * @property {boolean} [required]
	 * @property {boolean} [valid]
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
		password = $bindable(''),
		required = true,
		valid = $bindable(false)
	} = $props();

	let confirmPassword = $state('');

	const errors = $derived(validate.password(password));

	$effect(() => {
		valid = errors.length === 0 && password === confirmPassword;
	});
</script>

<TextInput bind:value={password} type="password" {label} {name} {required}>
	<ul class="list-inside list-disc" class:hidden={password === '' || errors.length === 0}>
		{#each errors as error}
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
