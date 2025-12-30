<script lang="ts">
	import Navbar from '$lib/navbar/+page.svelte';
	import SearchOverlay from '$lib/components/search/SearchOverlay.svelte';

	import './layout.css';

	let { children } = $props();
</script>

<Navbar />
<main class="pt-32">
	{@render children()}
</main>
<SearchOverlay />
