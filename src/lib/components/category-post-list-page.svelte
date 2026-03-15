<script lang="ts">
	import type { Category } from "types/category";
	import type { PostListItem } from "types/post";
	import Pager from "$lib/components/pager.svelte";
	import PostItem from "$lib/components/post-item.svelte";
	import { getMetaTitle, getOpenGraph, getTwitter } from "$lib/modules/meta";
	import { getSiteUrl } from "$lib/modules/site";
	import { MetaTags } from "svelte-meta-tags";

	type CategoryPostListPageData = {
		path: string;
		urlPrefix: string;
		category: Category;
		total: number;
		totalPage: number;
		currentPage?: number;
		posts: PostListItem[];
	};

	export let data: CategoryPostListPageData;

	const metaTitle = getMetaTitle(data.category.name);
</script>

<MetaTags
	title={metaTitle}
	canonical={getSiteUrl(data.path)}
	openGraph={getOpenGraph({
		title: metaTitle,
		path: data.path,
	})}
	twitter={getTwitter({
		title: metaTitle,
	})}
/>

<h1>
	{data.category.name} の記事一覧<span class="ml-2 text-xl"
		>({data.total}件)</span
	>
</h1>
{#each data.posts as post (post.slug)}
	<PostItem item={post} />
{/each}

<Pager
	prefix={data.urlPrefix}
	currentPage={data.currentPage ?? 1}
	totalPage={data.totalPage}
/>
