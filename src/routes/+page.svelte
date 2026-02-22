<script>
	import Certificate from '$lib/components/Certificate.svelte';
	import Form from '$lib/components/Form.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Pavestone from '$lib/components/Pavestone.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import storage from '$lib/storage.svelte.js';

	/** @type {import('./$types').PageProps} */
	const { data } = $props();

	/** @type {{x: number, y: number}} */
	let position = $state({ x: 0, y: 0 });

	/** @type {import('$lib/server/db/schema').Data | undefined} */
	let selected = $state();
</script>

<SearchBar
	class="fixed top-4 right-0 left-0 m-auto w-[calc(100%-2rem)] md:w-1/4"
	onselect={(pavestone) => (selected = pavestone)}
/>

<main class="overflow-auto print:hidden">
	<svg id="map" width={6901} height={5139}>
		{#each data.pavestones as pavestone}
			<Pavestone
				data={pavestone}
				onclick={(event) => {
					if (event.currentTarget instanceof SVGPathElement) {
						const { x, y } = event.currentTarget.getBBox();

						position.x = x;
						position.y = y;
					}

					selected = pavestone;
					storage.form.open = true;
				}}
				selected={pavestone.id === selected?.id}
			/>
		{/each}
	</svg>
</main>

<div class="fixed bottom-4 left-4 text-white">
	{#if !data.user}
		<a href="/login">Login</a>
	{:else}
		<form action="/logout" method="POST">
			<button class="cursor-pointer" type="submit">Logout</button>
		</form>
	{/if}
</div>

{#if selected}
	{#if storage.certificate.open}
		<Certificate data={selected} {position} />
	{:else}
		<Modal
			bind:open={storage.form.open}
			class="fixed inset-0 items-center justify-center bg-black/60 backdrop-blur-sm md:flex"
		>
			<Form data={selected} />
		</Modal>
	{/if}
{/if}
