<script lang="ts">
	import { browser } from "$app/environment";
	import Markdown from "$lib/components/markdown.svelte";
	import { getMetaTitle, getOpenGraph, getTwitter } from "$lib/modules/meta";
	import { Prism } from "$lib/modules/prism";
	import { getSiteUrl } from "$lib/modules/site";
	import dayjs from "dayjs";
	import { afterUpdate, tick } from "svelte";
	import { MetaTags } from "svelte-meta-tags";
	import type { PageServerData } from "./$types";

	export let data: PageServerData;
	const metaTitle = getMetaTitle(data.post.title);
	let articleRef: HTMLElement | undefined;
	let lastRenderedContent = "";

	const refreshEmbeddedContent = async () => {
		if (!browser || !articleRef) {
			return;
		}

		await tick();
		Prism.highlightAllUnder(articleRef);

		(
			window as Window & {
				twttr?: { widgets?: { load: (element?: HTMLElement) => void } };
			}
		).twttr?.widgets?.load(articleRef);
	};

	afterUpdate(() => {
		if (!browser || !data.post.content || !articleRef) {
			return;
		}

		if (lastRenderedContent === data.post.content) {
			return;
		}

		lastRenderedContent = data.post.content;
		void refreshEmbeddedContent();
	});
</script>

<MetaTags
	title={metaTitle}
	canonical={getSiteUrl(data.path)}
	openGraph={getOpenGraph({
		type: "article",
		path: data.path,
		title: metaTitle,
	})}
	twitter={getTwitter({
		title: metaTitle,
	})}
/>

<article bind:this={articleRef}>
	<span class="text-xs">{dayjs(data.post.date).format("YYYY/MM/DD")}</span>
	<h1 class="mt-2 text-2xl font-bold">{data.post.title}</h1>
	{#if data.post.categories.length > 0}
		<div class="my-4">
			{#each data.post.categories as category (category.id)}
				<a class="mr-3 text-sm font-bold" href={category.link}
					>{category.name}</a
				>
			{/each}
		</div>
	{/if}
	<div class="post-content leading-8">
		<Markdown content={data.post.content} />
	</div>
</article>
<div class="mt-8 text-center">
	<a href="/">一覧に戻る</a>
</div>

<svelte:head>
	<script async src="https://platform.twitter.com/widgets.js"></script>
</svelte:head>
