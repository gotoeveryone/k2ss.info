<script lang="ts">
	import Analytics from '$lib/components/analytics.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { getMetaTitle, getOpenGraph, getTwitter } from '$lib/modules/meta';
	import { MetaTags } from 'svelte-meta-tags';
	import '../app.css';
</script>

<MetaTags title={getMetaTitle()} openGraph={getOpenGraph()} twitter={getTwitter()} />

<Analytics />

<div class="flex justify-center">
	<div class="max-w-full md:max-w-screen-xl px-8">
		<Header />
		<main class="container py-4 md:px-4">
			<slot />
		</main>
		<Footer />
	</div>
</div>
