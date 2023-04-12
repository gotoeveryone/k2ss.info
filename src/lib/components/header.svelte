<script lang="ts">
	import { GITHUB_ACCOUNT, SITE_NAME, TWITTER_ACCOUNT } from '$lib/constants';
	import { fly } from 'svelte/transition';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import { faBars } from '@fortawesome/free-solid-svg-icons';

	let isOpen = false;

	const toggleMenu = () => {
		isOpen = !isOpen;
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
</script>

<header class="w-full h-8 mt-4 mb-2 flex items-center justify-between">
	<div>
		<a class="font-bold text-xl no-underline hover:underline" href="/">{SITE_NAME}</a>
	</div>
	<div class="relative flex items-stretch justify-center">
		<a
			class="w-9 flex items-center justify-center"
			target="_blank"
			rel="noopener noreferrer"
			href={`https://github.com/${GITHUB_ACCOUNT}`}
		>
			<Fa icon={faTwitter} size="lg" />
		</a>
		<a
			class="w-9 flex items-center justify-center"
			target="_blank"
			rel="noopener noreferrer"
			href={`https://twitter.com/${TWITTER_ACCOUNT}`}
		>
			<Fa icon={faGithub} size="lg" />
		</a>
		<button class="w-9 flex items-center justify-center" on:click={toggleMenu}>
			<Fa icon={faBars} size="lg" />
		</button>
		{#if isOpen}
			<ul
				transition:fly={{ duration: 500 }}
				class="absolute z-10 min-w-[200px] m-0 p-0 top-8 right-0 bg-gray-600 border border-black rounded"
			>
				<li class="list-none m-0 hover:bg-gray-700">
					<a class="px-4 py-3 block" on:click={toggleMenu} href="/">最近の記事</a>
				</li>
				<li class="list-none m-0">
					<ul class="m-0 p-0">
						{#each postItems as item}
							<li class="list-none m-0 pl-2 hover:bg-gray-700">
								<a
									class="px-4 py-2 block"
									on:click={toggleMenu}
									href={`/archives/category/${item.slug}/`}>{item.text}</a
								>
							</li>
							{#if item.subItems.length > 0}
								<li class="list-none m-0">
									<ul class="m-0 p-0">
										{#each item.subItems as subItem}
											<li class="list-none m-0 pl-4 hover:bg-gray-700">
												<a
													class="px-4 py-2 block"
													on:click={toggleMenu}
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
					<a class="px-4 py-3 block" on:click={toggleMenu} href="/profile/">Profile</a>
				</li>
				<li class="list-none m-0 hover:bg-gray-700">
					<a class="px-4 py-3 block" on:click={toggleMenu} href="/contact/">Contact</a>
				</li>
			</ul>
		{/if}
	</div>
</header>
