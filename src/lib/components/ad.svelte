<script lang="ts">
import { dev } from "$app/environment";
</script>

<svelte:head>
	{#if !dev}
		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<script>
			(adsbygoogle = window.adsbygoogle || []).push({
				google_ad_client: 'ca-pub-7425356251475066',
				enable_page_level_ads: true
			});
		</script>
	{/if}
</svelte:head>
