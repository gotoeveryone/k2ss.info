<article class="my-8">
  <span class="text-xs">{dayjs(data.post.date).format("YYYY/MM/DD")}</span>
  <h1 class="mt-2 text-2xl font-bold">{data.post.title.rendered}</h1>
  <div class="leading-8">{@html data.post.content.rendered}</div>
</article>
<div class="mt-8 text-center">
  <a href="/">一覧に戻る</a>
</div>

<script lang="ts">
  import type { PageServerData } from './$types';
  import dayjs from 'dayjs';

  export let data: PageServerData;
</script>
