<script lang="ts">
	import Ad from '$lib/components/ad.svelte';
	import Analytics from '$lib/components/analytics.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import '../app.css';
</script>

<Ad />
<Analytics />

<div class="flex justify-center">
	<div class="w-full max-w-full md:w-full md:max-w-screen-xl px-8">
		<Header />
		<main class="container py-4 md:px-4">
			<slot />
		</main>
		<Footer />
	</div>
</div>
