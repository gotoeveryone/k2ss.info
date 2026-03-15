<script lang="ts">
	/* eslint-disable svelte/valid-prop-names-in-kit-pages */
	export let status = 404;
	export let message = "ページが見つかりません";
</script>

<h1>{status}</h1>

<p>{message}</p>
