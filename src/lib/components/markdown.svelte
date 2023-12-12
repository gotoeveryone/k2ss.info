<script lang="ts">
	import { marked } from 'marked';

	const renderer = new marked.Renderer();
	renderer.link = (href, title, text) => {
		const target = href.startsWith('http') ? '_blank' : '_self';
		return `<a href="${href}" title="${title || ''}" target="${target}">${text}</a>`;
	};

	export let content: string;
</script>

{@html marked(content, { renderer })}
