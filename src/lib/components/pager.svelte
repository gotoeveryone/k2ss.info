<script lang="ts">
	export let currentPage: number;
	export let totalPage: number;
	export let prefix: string = '/';

	// 自身と前後1ページを表示する
	$: pages = [currentPage - 1, currentPage, currentPage + 1].filter((p) => p > 0 && p <= totalPage);
</script>

<div class="flex items-center justify-center">
	{#if !pages.includes(1)}
		<a href={prefix} class="block min-w-[25px] text-center">1</a>
		{#if currentPage - 2 > 1}
			<span class="block min-w-[25px] text-center">...</span>
		{/if}
	{/if}
	{#each pages as page}
		{#if page === currentPage}
			<span class="block min-w-[25px] text-center">{page}</span>
		{:else}
			<a href={page === 1 ? '' : `${prefix}page/${page}/`} class="block min-w-[25px] text-center"
				>{page}</a
			>
		{/if}
	{/each}
	{#if !pages.includes(totalPage)}
		{#if currentPage + 2 < totalPage}
			<span class="block min-w-[25px] text-center">...</span>
		{/if}
		<a href={`${prefix}page/${totalPage}/`} class="block min-w-[25px] text-center">{totalPage}</a>
	{/if}
</div>
