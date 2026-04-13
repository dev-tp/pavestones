<script>
	import { page } from '$app/state';
	import Icon from '$lib/components/Icon.svelte';

	const { children, data } = $props();

	/** @type {{ icon: import('$lib/components/Icon.svelte').Icon, href: string, label: string }[]} */
	const links = [
		{
			icon: 'user',
			href: '/settings',
			label: 'Update Profile'
		},
		{
			icon: 'at-sign',
			href: '/settings/email',
			label: 'Email'
		},
		{
			icon: 'key-round',
			href: '/settings/password',
			label: 'Change Password'
		}
	];
</script>

<div class="flex h-screen flex-col">
	<header class="col-span-2 flex items-center p-4">
		<h1 class="text-2xl">
			<a href="/">Pavestones</a>
		</h1>
		<nav class="ml-auto">
			<form action="/logout" method="POST">
				<button class="cursor-pointer" type="submit">Logout</button>
			</form>
		</nav>
	</header>
	<div class="flex min-h-0 grow flex-col md:flex-row">
		<aside class="shrink-0 overflow-auto md:max-w-75 md:basis-75">
			<h2 class="p-4 text-xl">Settings</h2>
			<ul>
				{#each links as { icon, href, label }}
					<li>
						<a {href}>
							<div
								class="flex items-center gap-4 p-4 text-slate-700 hover:bg-slate-200 hover:text-black"
								class:!text-black={href === page.url.pathname}
							>
								<Icon name={icon} />
								<span>{label}</span>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</aside>
		<main class="grow overflow-auto p-4">
			{@render children()}
		</main>
	</div>
	<footer class="p-4 text-center text-xs text-slate-500">
		<p>
			Copyleft <span class="inline-block rotate-180">&copy;</span>
			{new Date().getFullYear()}. All Rights Reversed Engineered.
		</p>
		<p>
			commit: <a
				href="https://www.github.com/dev-tp/pavestones/commit/{data.commit}"
				target="_blank"
			>
				{data.commit}
			</a>
		</p>
	</footer>
</div>
