<script lang="ts">
	import dayjs from 'dayjs';
	import type { PostListItem } from 'types/post';

	export let item: PostListItem;
</script>

<div class="my-8">
	<span class="text-xs">{dayjs(item.date).format('YYYY/MM/DD')}</span>
	<h2 class="mt-2 text-xl font-bold hover:underline">
		<a href={`/archives/${item.slug}/`}>{item.title}</a>
	</h2>
	<div class="leading-8">{@html item.excerpt}</div>
</div>
