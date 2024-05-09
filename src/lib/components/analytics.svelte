<script lang="ts">
import { dev } from "$app/environment";
</script>

<svelte:head>
	{#if !dev}
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-S573SSFVY6"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-S573SSFVY6');
		</script>
	{/if}
</svelte:head>
