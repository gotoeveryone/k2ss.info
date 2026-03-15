<script lang="ts">
	import { marked } from "marked";

	const renderer = new marked.Renderer();
	renderer.link = function ({ href, title, tokens }) {
		const content = this.parser.parseInline(tokens);
		const target = href.startsWith("http") ? "_blank" : "_self";
		const rel = target === "_blank" ? ' rel="noopener noreferrer"' : "";
		return `<a href="${href}" title="${
			title || ""
		}" target="${target}"${rel}>${content}</a>`;
	};

	export let content: string;
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html marked(content, { renderer })}
