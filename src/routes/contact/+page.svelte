<script lang="ts">
	import { getMetaTitle, getOpenGraph } from '$lib/modules/meta';
	import { getSiteUrl } from '$lib/modules/site';
	import { MetaTags } from 'svelte-meta-tags';

	const title = getMetaTitle('Contact');
</script>

<MetaTags
	{title}
	canonical={getSiteUrl('/contact/')}
	openGraph={getOpenGraph({ title, path: '/contact/' })}
/>

<div class="leading-8">
	<div style="color: #f00; font-size: 1.2em">※ご注意ください</div>
	<ul class="posts">
		<li>
			入力されたメールアドレスが「k2ss.info」ドメインからのメールを受信できるよう設定をお願いします。
		</li>
		<li>お問い合わせの内容については、お返事に時間がかかることがあります。</li>
		<li>
			「一緒に仕事してみたい」「こんなこと相談していいのかな…」というお問合せもお待ちしております。
		</li>
	</ul>

	<div style="color: #f00; font-size: 1.2em">※Notes</div>
	<ul class="posts">
		<li>
			Please make settings so that the input mail address can receive mail from "k2ss.info" domain.
		</li>
		<li>Depending on contents of contact, I sometimes take time to reply.</li>
	</ul>

	<iframe
		src="https://docs.google.com/forms/d/e/1FAIpQLSckIJ1h8hRg56s1geieJrWMK6BMg-q0iSMSFwzZWuAvlVFDxg/viewform?embedded=true"
		class="w-full"
		height="950"
		frameborder="0"
		marginheight="0"
		marginwidth="0">読み込んでいます…</iframe
	>
</div>
