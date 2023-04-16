<script lang="ts">
	import { getMetaTitle, getOpenGraph } from '$lib/modules/meta';
	import { getSiteUrl } from '$lib/modules/site';
	import dayjs from 'dayjs';
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<MetaTags
	title={getMetaTitle(data.post.title.rendered)}
	canonical={getSiteUrl(data.path)}
	openGraph={getOpenGraph({ type: 'article', path: data.path })}
/>

<article>
	<span class="text-xs">{dayjs(data.post.date).format('YYYY/MM/DD')}</span>
	<h1 class="mt-2 text-2xl font-bold">{data.post.title.rendered}</h1>
	{#if data.post.categories.length > 0}
		<div class="my-4">
			{#each data.post.categories as category}
				<a class="mr-3 font-bold text-sm" href={category.link}>{category.name}</a>
			{/each}
		</div>
	{/if}
	<div class="leading-8">{@html data.post.content.rendered}</div>
</article>
<div class="mt-8 text-center">
	<a href="/">一覧に戻る</a>
</div>

<svelte:head>
	<script async src="https://platform.twitter.com/widgets.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"
		integrity="sha512-7Z9J3l1+EYfeaPKcGXu3MS/7T+w19WtKQY/n+xzmw4hZhJ9tyYmcUS+4QqAlzhicE5LAfMQSF3iFTK9bQdTxXg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
		integrity="sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"
		integrity="sha512-7Z9J3l1+EYfeaPKcGXu3MS/7T+w19WtKQY/n+xzmw4hZhJ9tyYmcUS+4QqAlzhicE5LAfMQSF3iFTK9bQdTxXg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"
		integrity="sha512-SkmBfuA2hqjzEVpmnMt/LINrjop3GKWqsuLSSB3e7iBmYK7JuWw4ldmmxwD9mdm2IRTTi0OxSAfEGvgEi0i2Kw=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"
		integrity="sha512-BttltKXFyWnGZQcRWj6osIg7lbizJchuAMotOkdLxHxwt/Hyo+cl47bZU0QADg+Qt5DJwni3SbYGXeGMB5cBcw=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"
		integrity="sha512-/kVH1uXuObC0iYgxxCKY41JdWOkKOxorFVmip+YVifKsJ4Au/87EisD1wty7vxN2kAhnWh6Yc8o/dSAXj6Oz7A=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
		integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css"
		integrity="sha512-cbQXwDFK7lj2Fqfkuxbo5iD1dSbLlJGXGpfTDqbggqjHJeyzx88I3rfwjS38WJag/ihH7lzuGlGHpDBymLirZQ=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>
