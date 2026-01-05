<script lang="ts">
	import Navbar from '$lib/navbar/+page.svelte';
	import SearchOverlay from '$lib/components/search/SearchOverlay.svelte';

	import './layout.css';
	import { page } from '$app/state';

	let { children } = $props();

	const hideNavbar = $derived(page.url.pathname === '/login');
</script>

{#if !hideNavbar}
	<Navbar />
{/if}

<main class="pt-32">
	{@render children()}
</main>
<SearchOverlay />
