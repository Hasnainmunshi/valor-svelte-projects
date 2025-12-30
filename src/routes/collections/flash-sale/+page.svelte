<script>
	import { products } from '$lib/data/products';

	let sort = 'best';
	let priceFilter = 'all';
	let availability = 'all';

	// Only Flash Sale
	$: flashProducts = products.filter((p) => p.category === 'flash-sale');

	// Filters
	$: filtered = flashProducts
		.filter((p) =>
			priceFilter === 'low'
				? p.salePrice <= 1500
				: priceFilter === 'high'
					? p.salePrice > 1500
					: true
		)
		.filter((p) =>
			availability === 'in' ? p.inStock : availability === 'out' ? !p.inStock : true
		);

	// Sorting
	$: sorted = [...filtered].sort((a, b) => {
		if (sort === 'low') return a.salePrice - b.salePrice;
		if (sort === 'high') return b.salePrice - a.salePrice;
		return 0;
	});
</script>

<section class="pt-6">
	<div class="bg-gray-100 p-8 md:px-52">
		<h1 class="text-3xl font-semibold">Flash Sale</h1>
		<p class="text-gray-700 mt-2">⚡ VALOR Flash Sale!</p>
		<p class="text-gray-700">Selected Panjabi items now at special price – limited time only.</p>
		<p class="text-gray-700">Limited stock • Limited Sizes</p>
	</div>

	<!-- Filters + Sort -->
	<div class="flex flex-col md:flex-row justify-between px-6 md:px-52 mt-6 gap-4">
		<div class="flex gap-4 items-center flex-wrap">
			<span class="text-gray-500 font-medium">Filter:</span>

			<select bind:value={availability} class="  text-sm text-gray-600">
				<option value="all">Availability</option>
				<option value="in">In Stock</option>
				<option value="out">Sold Out</option>
			</select>

			<select bind:value={priceFilter} class=" text-sm text-gray-600">
				<option value="all">Price</option>
				<option value="low">Under 1500</option>
				<option value="high">1500+</option>
			</select>
		</div>

		<div class="flex gap-3 items-center">
			<span class="text-gray-500 font-medium">Sort:</span>
			<select bind:value={sort} class=" text-sm text-gray-600">
				<option value="best">Best Selling</option>
				<option value="low">Price: Low to High</option>
				<option value="high">Price: High to Low</option>
			</select>
			<p class="text-[14px] text-gray-500 ml-2">{sorted.length} products</p>
		</div>
	</div>

	<!-- Product Grid -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-52 mt-10 pb-20">
		{#each sorted as item}
			<a href={`/products/${item.id}`} class="group block relative">
				<!-- Product Image + Discount Badge inside -->
				<div class="relative overflow-hidden rounded-lg">
					<img
						src={item.image}
						alt={item.title}
						class="rounded-lg w-full h-80 object-cover transition group-hover:scale-105 duration-300"
					/>

					{#if item.hoverImage}
						<img
							src={item.hoverImage}
							alt={item.title + 'alternate'}
							class="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition duration-300 group-hover:opacity-100"
						/>
					{/if}

					{#if item.discount}
						<span
							class="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow"
						>
							{item.discount}% OFF
						</span>
					{/if}

					{#if !item.inStock}
						<div
							class="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg"
						>
							SOLD OUT
						</div>
					{/if}
				</div>

				<p class="mt-2 text-sm">{item.title}</p>

				<!-- Price Display -->
				<div class="flex gap-2 items-center">
					<span class="font-semibold">{item.salePrice} BDT</span>
					<span class="line-through text-gray-500 text-sm">{item.price} BDT</span>
				</div>
			</a>
		{/each}
	</div>
</section>
