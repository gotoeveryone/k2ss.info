<script lang="ts">
	import { formatJstDate } from "#lib/modules/date.ts";
	import type { PostListItem } from "#types/post.ts";

	export let item: PostListItem;
</script>

<div class="my-8">
	<span class="text-xs">{formatJstDate(item.date)}</span>
	<h2 class="mt-2 text-xl font-bold hover:underline">
		<a href={`/archives/${item.slug}/`}>{item.title}</a>
	</h2>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div class="leading-8">{@html item.excerpt}</div>
</div>
