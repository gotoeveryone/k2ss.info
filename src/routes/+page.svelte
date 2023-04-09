<h1>Posts</h1>
{#await getPosts}
<!-- promise is pending -->
<p>...waiting</p>
{:then}
{#each posts as post}
<div>
  <h2 class="text-xl font-bold hover:underline">
    <a href={`/archives/${post.id}`}>{post.title.rendered}</a>
    <span class="ml-4 text-xs">{dayjs(post.date).format("YYYY/MM/DD")}</span>
  </h2>
  <div>{@html post.excerpt.rendered}</div>
</div>
{/each}
{/await}

<script lang="ts">
  import dayjs from 'dayjs';
  import type { PostListItem } from '../types/post';

  const endpoint = 'https://k2ss.info/wp-json/wp/v2/posts?context=embed';

  let posts: PostListItem[] = [];

  const fetchPosts = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  };

  const getPosts = (async () => {
    const data = await fetchPosts();
    posts = data;
  })();
</script>
