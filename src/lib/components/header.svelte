<script lang="ts">
	import { browser } from "$app/environment";
	import {
		GITHUB_ACCOUNT,
		SITE_DESCRIPTION,
		SITE_NAME,
		TWITTER_ACCOUNT,
	} from "$lib/constants";
	import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
	import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
	import { onDestroy, onMount } from "svelte";
	import Fa from "svelte-fa";

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
			slug: "it",
			text: "IT",
			subItems: [
				{ slug: "golang", text: "Golang" },
				{ slug: "python", text: "Python" },
				{ slug: "javascript", text: "JavaScript" },
				{ slug: "php", text: "PHP" },
				{ slug: "operation", text: "インフラ・運用" },
			],
		},
		{ slug: "igo", text: "囲碁", subItems: [] },
		{
			slug: "others",
			text: "その他",
			subItems: [
				{ slug: "jobs", text: "仕事" },
				{ slug: "certificates", text: "資格" },
				{ slug: "meals", text: "料理" },
				{ slug: "travels", text: "旅行" },
			],
		},
	];

	onMount(() => {
		if (browser) {
			window.addEventListener("click", handleClickToCloseDropdown, {
				passive: true,
			});
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener("click", handleClickToCloseDropdown);
		}
	});
</script>

<header
	class="sticky top-0 z-10 flex h-[60px] w-full items-center justify-between bg-gray-800 md:h-[72px]"
>
	<div>
		<a class="block text-xl font-bold no-underline hover:underline" href="/"
			>{SITE_NAME}</a
		>
		<span class="text-sm">{SITE_DESCRIPTION}</span>
	</div>
	<div class="flex items-stretch justify-center">
		<a
			class="mx-2 flex w-8 items-center justify-center"
			title="X"
			target="_blank"
			rel="noopener noreferrer"
			href={`https://x.com/${TWITTER_ACCOUNT}`}
		>
			<Fa icon={faXTwitter} size="lg" />
		</a>
		<a
			class="mx-2 flex w-8 items-center justify-center"
			title="GitHub"
			target="_blank"
			rel="noopener noreferrer"
			href={`https://github.com/${GITHUB_ACCOUNT}`}
		>
			<Fa icon={faGithub} size="lg" />
		</a>
		<button
			class="ml-2 flex w-8 items-center justify-center"
			title="メニュー"
			bind:this={buttonRef}
			on:click={toggleDropdown}
		>
			<Fa icon={faBars} size="lg" />
		</button>
		<div
			class={`fixed right-0 top-0 z-10 m-0 h-screen min-w-[150px] overflow-y-auto overscroll-y-none bg-gray-900 p-0 opacity-90 transition-transform md:min-w-[250px] ${
				isOpen ? "translate-x-0" : "translate-x-full"
			}`}
			tabindex="-1"
		>
			<div class="flex items-center justify-end p-2">
				<button
					type="button"
					class="rounded p-2 text-lg hover:bg-gray-700"
					on:click={closeDropdown}
				>
					<Fa icon={faTimes} size="lg" />
				</button>
			</div>
			<ul class="m-0 border border-black p-0 text-base">
				<li class="m-0 list-none hover:bg-gray-700">
					<a class="block px-4 py-3" href="/">最近の記事</a>
				</li>
				<li class="m-0 list-none">
					<ul class="m-0 p-0">
						{#each postItems as item (item.slug)}
							<li class="m-0 list-none pl-2 hover:bg-gray-700">
								<a
									class="block px-4 py-2"
									href={`/archives/category/${item.slug}/`}>{item.text}</a
								>
							</li>
							{#if item.subItems.length > 0}
								<li class="m-0 list-none">
									<ul class="m-0 p-0">
										{#each item.subItems as subItem (subItem.slug)}
											<li class="m-0 list-none pl-4 hover:bg-gray-700">
												<a
													class="block px-4 py-2"
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
				<li class="m-0 list-none hover:bg-gray-700">
					<a class="block px-4 py-3" href="/profile/">Profile</a>
				</li>
				<li class="m-0 list-none hover:bg-gray-700">
					<a class="block px-4 py-3" href="/privacy-policy/">Privacy policy</a>
				</li>
				<li class="m-0 list-none hover:bg-gray-700">
					<a class="block px-4 py-3" href="/contact/">Contact</a>
				</li>
			</ul>
		</div>
	</div>
</header>
