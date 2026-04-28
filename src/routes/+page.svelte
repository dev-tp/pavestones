<script module>
	/** @import { Data } from '$lib/server/db/schema' */
</script>

<script>
	import panzoom from 'panzoom';
	import { tick } from 'svelte';

	import Certificate from '$lib/components/Certificate.svelte';
	import Form from '$lib/components/Form.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import storage from '$lib/storage.svelte';

	/** @type {import('./$types').PageProps} */
	const { data } = $props();

	/** @type {HTMLElement} */
	let container;

	/** @type {Record<number, {data: Data, path: SVGPathElement}>} */
	let records = $state({});

	/** @type {{x: number, y: number}} */
	let position = $state({ x: 0, y: 0 });

	/** @type {number | undefined} */
	let selected = $state();

	/** @type {boolean} */
	let wasPanning = $state(false);

	async function enablePanZoom() {
		await tick();

		const svg = container.querySelector('svg');

		if (!svg) {
			return;
		}

		const controller = panzoom(svg);

		const ALTAR_X = 4412;
		const ALTAR_Y = 2800;

		controller.moveBy(window.innerWidth / 2 - ALTAR_X, window.innerHeight / 2 - ALTAR_Y, false);

		controller.on('panend', () => {
			wasPanning = true;
		});
	}

	async function populate() {
		await tick();

		const response = await fetch('/api/records', { cache: 'default' });

		/** @type {Data[]} */
		const entries = await response.json();
		const paths = container.querySelectorAll('path');

		for (let i = 0; i < paths.length; i++) {
			paths[i].onclick = (event) => {
				if (wasPanning) {
					wasPanning = false;
					return;
				}

				if (event.currentTarget instanceof SVGPathElement) {
					const { x, y } = event.currentTarget.getBBox();

					position.x = x;
					position.y = y;
				}

				updateSelectedId(entries[i].id);
				storage.form.open = true;
			};

			paths[i].tabIndex = 0;

			if (entries[i].entry) {
				paths[i].classList.add('sold');
			}

			records[entries[i].id] = { data: entries[i], path: paths[i] };
		}
	}

	/** @type {(id: number | undefined) => void} */
	function updateSelectedId(id) {
		if (selected) {
			records[selected].path.classList.remove('selected');
		}

		if (!id) {
			return (selected = undefined);
		}

		const { path } = records[id];

		path.classList.add('selected');
		path.focus();

		selected = id;
	}
</script>

<svelte:head>
	<title>Pavestones</title>
</svelte:head>

<main bind:this={container} class="print:hidden">
	{#await import('$lib/assets/cathedral.svg?raw')}
		<div class="fixed inset-0 flex items-center justify-center">
			<Loading />
		</div>
	{:then content}
		{@html content.default}
		<div class="hidden">
			{enablePanZoom()}
			{populate()}
		</div>
	{/await}
</main>

<SearchBar
	class="fixed top-4 right-0 left-0 m-auto w-[calc(100%-2rem)] md:w-1/4"
	onselect={updateSelectedId}
/>

<div class="fixed right-4 bottom-4 flex flex-col items-end gap-4 text-white">
	{#if !data.user}
		<a href="/login">Login</a>
	{:else}
		<a href="/settings">Settings</a>
		<form action="/logout" method="POST" class="flex">
			<button class="cursor-pointer" type="submit">Logout</button>
		</form>
	{/if}
</div>

{#if selected}
	{#if storage.certificate.open}
		<Certificate data={records[selected].data} {position} />
	{:else}
		<Modal
			bind:open={storage.form.open}
			class="fixed inset-0 items-center justify-center bg-black/60 backdrop-blur-sm md:flex"
		>
			<Form
				data={records[selected].data}
				onupdate={(data) => {
					if (data.entry) {
						records[data.id].path.classList.add('sold');
					} else {
						records[data.id].path.classList.remove('sold');
					}

					if (records[data.id].data.entry?.donor?.fullName !== data.entry?.donor?.fullName) {
						return populate();
					}

					records[data.id].data = data;
				}}
			/>
		</Modal>
	{/if}
{/if}
