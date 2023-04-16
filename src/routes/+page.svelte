<script lang="ts">
	import PostItem from '$lib/components/post-item.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>最近の記事</h1>
{#each data.posts as post}
	<PostItem item={post} />
{/each}
