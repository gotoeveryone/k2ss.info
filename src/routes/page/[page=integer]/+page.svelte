<script lang="ts">
	import type { PageServerData } from './$types';
	import Pager from '$lib/components/pager.svelte';
	import PostItem from '$lib/components/post-item.svelte';

	export let data: PageServerData;
</script>

<h1>記事一覧 ({data.total}件)</h1>
{#each data.posts as post}
	<PostItem item={post} />
{/each}

<Pager currentPage={data.currentPage} totalPage={data.totalPage} />
