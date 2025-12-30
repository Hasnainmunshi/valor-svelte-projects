<script>
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { paginate } from '$lib/utils/pagination';

	let loading = true;
	let sort = 'best';
	let price = 'all';
	let stock = 'all';
	let pageIndex = 1;
	const limit = 12;

	$: slug = $page.params.slug;
	$: collection = slug.replace('-', ' ');
	$: filtered = products.filter((p) => p.category.toLowerCase().replace(/ /g, '-') === slug);

	// FILTERS
	$: filtered = filtered
		.filter((p) =>
			price === 'low' ? p.salePrice <= 1500 : price === 'high' ? p.salePrice > 1500 : true
		)
		.filter((p) => (stock === 'in' ? p.inStock : stock === 'out' ? !p.inStock : true));

	// SORT
	$: filtered =
		sort === 'low'
			? [...filtered].sort((a, b) => a.salePrice - b.salePrice)
			: sort === 'high'
				? [...filtered].sort((a, b) => b.salePrice - a.salePrice)
				: filtered;

	// PAGINATION
	$: paginated = paginate(filtered, pageIndex, limit);

	onMount(() => {
		setTimeout(() => (loading = false), 600);
	});
</script>

<!-- SEO -->
<svelte:head>
	<title>{collection} Collection | VALOR</title>
	<meta
		name="description"
		content="Shop {collection} premium panjabi collection. Best offer & discount."
	/>
</svelte:head>

<section class="mt-24 px-10">
	<!-- Banner -->
	<div
		class="h-52 rounded-xl bg-cover bg-center flex items-center justify-center text-white text-3xl font-bold shadow-lg"
		style={`background-image:url('/banners/${slug}.webp')`}
	>
		{collection}
	</div>

	<!-- Filters UI -->
	<div class="flex justify-between items-center mt-10 flex-wrap gap-5">
		<div class="flex gap-3">
			<select bind:value={stock} class="border px-3 py-1 rounded">
				<option value="all">Availability</option>
				<option value="in">In Stock</option>
				<option value="out">Sold Out</option>
			</select>

			<select bind:value={price} class="border px-3 py-1 rounded">
				<option value="all">Price</option>
				<option value="low">Under 1500</option>
				<option value="high">1500+</option>
			</select>
		</div>

		<div class="flex gap-3 items-center">
			<p class="text-sm text-gray-600">{filtered.length} items found</p>
			<select bind:value={sort} class="border px-3 py-1 rounded">
				<option value="best">Best Selling</option>
				<option value="low">Price: Low to High</option>
				<option value="high">Price: High to Low</option>
			</select>
		</div>
	</div>

	{#if loading}
		<Loader />
	{:else}
		<!-- Products -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
			{#each paginated.data as item}
				<ProductCard {item} />
			{/each}
		</div>

		<!-- Pagination -->
		<div class="flex justify-center mt-10 gap-3">
			{#each Array(paginated.totalPages) as _, i}
				<button
					class={`px-4 py-2 border rounded ${pageIndex === i + 1 ? 'bg-black text-white' : ''}`}
					on:click={() => (pageIndex = i + 1)}
				>
					{i + 1}
				</button>
			{/each}
		</div>
	{/if}
</section>
