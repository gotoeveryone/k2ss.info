<h1>{data.category.name} の記事一覧</h1>
{#each data.posts as post}
<div class="my-8">
  <span class="text-xs">{dayjs(post.date).format("YYYY/MM/DD")}</span>
  <h2 class="mt-2 text-xl font-bold hover:underline">
    <a href={`/archives/${post.id}/`}>{post.title.rendered}</a>
  </h2>
  <div>{@html post.excerpt.rendered}</div>
</div>
{/each}

<script lang="ts">
  import type { PageServerData } from '../$types';
  import dayjs from 'dayjs';

  export let data: PageServerData;
</script>
