<script lang="ts">
	import Navbar from '$lib/navbar/+page.svelte';
	import SearchOverlay from '$lib/components/search/SearchOverlay.svelte';
	import CartSidebar from './collections/cartSidebar/+page.svelte';
	import Footer from '$lib/footer/+page.svelte';
	import './layout.css';
	import { page } from '$app/state';

	let { children } = $props();

	const hideNavbar = $derived(
		page.url.pathname === '/auth/login' || page.url.pathname === '/checkout'
	);
</script>

{#if !hideNavbar}
	<Navbar />
{/if}

<main class={!hideNavbar ? 'pt-32' : ''}>
	{@render children()}
</main>
<Footer />
<SearchOverlay />
<CartSidebar />
