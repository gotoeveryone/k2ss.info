<script lang="ts">
	import { browser } from '$app/environment';
	import { GITHUB_ACCOUNT, SITE_DESCRIPTION, SITE_NAME, TWITTER_ACCOUNT } from '$lib/constants';
	import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy, onMount } from 'svelte';
	import Fa from 'svelte-fa';

	let isOpen = false;
	let buttonRef: HTMLButtonElement;

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const closeDropdown = () => {
		isOpen = false;
	};

	const handleClickToCloseDropdown = (event: Event) => {
		if (!isOpen || buttonRef?.contains(event.target as Node)) {
			return;
		}
		closeDropdown();
	};

	const postItems = [
		{
			slug: 'it',
			text: 'IT',
			subItems: [
				{ slug: 'golang', text: 'Golang' },
				{ slug: 'python', text: 'Python' },
				{ slug: 'javascript', text: 'JavaScript' },
				{ slug: 'php', text: 'PHP' },
				{ slug: 'operation', text: 'インフラ・運用' }
			]
		},
		{ slug: 'igo', text: '囲碁', subItems: [] },
		{
			slug: 'others',
			text: 'その他',
			subItems: [
				{ slug: 'jobs', text: '仕事' },
				{ slug: 'books', text: '本・漫画' },
				{ slug: 'certificates', text: '資格' },
				{ slug: 'meals', text: '料理' },
				{ slug: 'travels', text: '旅行' }
			]
		}
	];

	onMount(() => {
		if (browser) {
			window.addEventListener('click', handleClickToCloseDropdown, { passive: true });
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('click', handleClickToCloseDropdown);
		}
	});
</script>

<header
	class="sticky z-10 top-0 w-full h-[60px] md:h-[72px] bg-gray-800 flex items-center justify-between"
>
	<div>
		<a class="block font-bold text-xl no-underline hover:underline" href="/">{SITE_NAME}</a>
		<span class="text-sm">{SITE_DESCRIPTION}</span>
	</div>
	<div class="flex items-stretch justify-center">
		<a
			class="mx-2 w-8 flex items-center justify-center"
			title="Twitter"
			target="_blank"
			rel="noopener noreferrer"
			href={`https://github.com/${GITHUB_ACCOUNT}`}
		>
			<Fa icon={faTwitter} size="lg" />
		</a>
		<a
			class="mx-2 w-8 flex items-center justify-center"
			title="GitHub"
			target="_blank"
			rel="noopener noreferrer"
			href={`https://twitter.com/${TWITTER_ACCOUNT}`}
		>
			<Fa icon={faGithub} size="lg" />
		</a>
		<button
			class="ml-2 w-8 flex items-center justify-center"
			title="メニュー"
			bind:this={buttonRef}
			on:click={toggleDropdown}
		>
			<Fa icon={faBars} size="lg" />
		</button>
		<div
			class={`fixed z-10 min-w-[250px] h-screen m-0 p-0 top-0 right-0 overflow-y-auto transition-transform bg-gray-900 opacity-90 ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
			tabindex="-1"
		>
			<div class="flex items-center justify-end p-2">
				<button
					type="button"
					class="p-2 rounded text-lg hover:bg-gray-700"
					on:click={closeDropdown}
				>
					<Fa icon={faTimes} size="lg" />
				</button>
			</div>
			<ul class="m-0 p-0 overflow-y-auto border border-black">
				<li class="list-none m-0 hover:bg-gray-700">
					<a class="px-4 py-3 block" href="/">最近の記事</a>
				</li>
				<li class="list-none m-0">
					<ul class="m-0 p-0">
						{#each postItems as item}
							<li class="list-none m-0 pl-2 hover:bg-gray-700">
								<a class="px-4 py-2 block" href={`/archives/category/${item.slug}/`}>{item.text}</a>
							</li>
							{#if item.subItems.length > 0}
								<li class="list-none m-0">
									<ul class="m-0 p-0">
										{#each item.subItems as subItem}
											<li class="list-none m-0 pl-4 hover:bg-gray-700">
												<a
													class="px-4 py-2 block"
													href={`/archives/category/${item.slug}/${subItem.slug}/`}
													>{subItem.text}</a
												>
											</li>
										{/each}
									</ul>
								</li>
							{/if}
						{/each}
					</ul>
				</li>
				<li class="list-none m-0 hover:bg-gray-700">
					<a class="px-4 py-3 block" href="/profile/">Profile</a>
				</li>
				<li class="list-none m-0 hover:bg-gray-700">
					<a class="px-4 py-3 block" href="/contact/">Contact</a>
				</li>
			</ul>
		</div>
	</div>
</header>
