<header class="relative w-full h-8 mt-4 mb-2 flex items-stretch justify-end">
  <a class="w-9 flex items-center justify-center" target="_blank" rel="noopener noreferrer" href="https://github.com/gotoeveryone/">
    <Fa icon={faTwitter} size="lg" />
  </a>
  <a class="w-9 flex items-center justify-center" target="_blank" rel="noopener noreferrer" href="https://twitter.com/kzkamago0721">
    <Fa icon={faGithub} size="lg" />
  </a>
  <button class="w-9 flex items-center justify-center" on:click={toggleMenu}>
    <Fa icon={faBars} size="lg" />
  </button>
  {#if isOpen}
  <ul transition:fly="{{ duration: 500 }}" class="absolute min-w-[150px] m-0 p-0 top-8 right-0 bg-gray-600 border border-black rounded">
    <li class="list-none m-0 hover:bg-gray-700"><a class="p-4 block" on:click={toggleMenu} href="/">Posts</a></li>
    <li class="list-none m-0 hover:bg-gray-700"><a class="p-4 block" on:click={toggleMenu} href="/profile">Profile</a></li>
    <li class="list-none m-0 hover:bg-gray-700"><a class="p-4 block" on:click={toggleMenu} href="/contact">Contact</a></li>
  </ul>
  {/if}
</header>

<script lang="ts">
	import { fly } from 'svelte/transition';
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
  import { faBars } from '@fortawesome/free-solid-svg-icons';

  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  }
</script>
