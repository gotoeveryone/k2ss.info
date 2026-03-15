<script lang="ts">
	import CategoryPostListPage from "$lib/components/category-post-list-page.svelte";
	import type { PageServerData } from "./$types";

	export let data: PageServerData;
</script>

<CategoryPostListPage {data} />
