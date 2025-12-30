<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';
	import Loader from '$lib/components/Loader.svelte';
	import { paginate } from '$lib/utils/pagination';

	let loading = true;

	let sort = 'best';
	let priceFilter = 'all';
	let availability = 'all';
	let pageIndex = 1;
	const limit = 12;

	// Reactive slug and collection
	$: slug = $page.params.slug;
	$: collection = slug.replace('-', ' ');

	// Filter products by category
	$: collectionProducts = products.filter(
		(p) => p.category.toLowerCase().replace(/ /g, '-') === slug
	);

	// Filter + Sort + Paginate
	$: sortedPaginated = paginate(
		[...collectionProducts]
			.filter((p) =>
				priceFilter === 'low'
					? p.salePrice <= 1500
					: priceFilter === 'high'
						? p.salePrice > 1500
						: true
			)
			.filter((p) =>
				availability === 'in' ? p.inStock : availability === 'out' ? !p.inStock : true
			)
			.sort((a, b) => {
				if (sort === 'low') return a.salePrice - b.salePrice;
				if (sort === 'high') return b.salePrice - a.salePrice;
				return 0;
			}),
		pageIndex,
		limit
	);

	onMount(() => {
		setTimeout(() => (loading = false), 600);
	});
</script>

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
			<select bind:value={availability} class="border px-3 py-1 rounded">
				<option value="all">Availability</option>
				<option value="in">In Stock</option>
				<option value="out">Sold Out</option>
			</select>

			<select bind:value={priceFilter} class="border px-3 py-1 rounded">
				<option value="all">Price</option>
				<option value="low">Under 1500</option>
				<option value="high">1500+</option>
			</select>
		</div>

		<div class="flex gap-3 items-center">
			<p class="text-sm text-gray-600">{sortedPaginated.totalItems} items found</p>
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
		<!-- Products Grid -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
			{#each sortedPaginated.data as item}
				<a href={`/products/${item.id}`} class="group block relative">
					<div class="relative overflow-hidden rounded-lg">
						<img
							src={item.image}
							alt={item.title}
							class="w-full h-80 object-cover transition duration-300 group-hover:scale-105 rounded-lg"
						/>

						{#if item.hoverImage}
							<img
								src={item.hoverImage}
								alt={item.title + ' alternate'}
								class="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition duration-300 group-hover:opacity-100"
							/>
						{/if}

						{#if item.discount}
							<div class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
								{item.discount}% OFF
							</div>
						{/if}

						{#if !item.inStock}
							<div
								class="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl"
							>
								SOLD OUT
							</div>
						{/if}
					</div>

					<p class="mt-3 text-sm font-medium">{item.title}</p>
					<div class="flex gap-2 items-center mt-1">
						<span class="font-semibold">{item.salePrice} BDT</span>
						<span class="line-through text-gray-500 text-sm">{item.price} BDT</span>
					</div>
				</a>
			{/each}
		</div>

		<!-- Pagination -->
		<div class="flex justify-center mt-10 gap-3">
			{#each Array(sortedPaginated.totalPages) as _, i}
				<button
					class={`px-4 py-2 border rounded ${pageIndex === i + 1 ? 'bg-black text-white cursor-default' : ''}`}
					disabled={pageIndex === i + 1}
					on:click={() => (pageIndex = i + 1)}
				>
					{i + 1}
				</button>
			{/each}
		</div>
	{/if}
</section>
