<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
</script>

<div class="flex justify-center">
	<div class="max-w-full md:max-w-screen-xl px-8">
		<Header />
		<main class="container py-4 md:px-4">
			<slot />
		</main>
		<Footer />
	</div>
</div>
