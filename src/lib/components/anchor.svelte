<script lang="ts">
	import { MarkdownTokens } from '@magidoc/plugin-svelte-marked';
	import type { marked } from 'marked';
	import type { MarkdownOptions, Renderers } from '@magidoc/plugin-svelte-marked';

	export let token: marked.Tokens.Link;
	export let renderers: Renderers;
	export let options: MarkdownOptions;

	$: target = token.href.startsWith('/') ? '_self' : '_blank';
</script>

<a href={token.href} title={token.title} {target}>
	<MarkdownTokens tokens={token.tokens} {options} {renderers} />
</a>
