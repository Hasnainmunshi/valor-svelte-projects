<script>
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';
	import {
		ArrowDownNarrowWide,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		CircleX,
		Download,
		Heart
	} from '@lucide/svelte';
	import { stopPropagation } from 'svelte/legacy';
	import Size from '$lib/stores/size.svelte';

	let qty = 1;
	let selectedSize = 'M';
	let showSizeGuide = false;

	const sizes = ['M', 'L', 'XL', '2XL'];
	const color = 'Champagne Beige';

	$: product = products.find((p) => p.id === Number($page.params.id));

	$: recommended = products
		.filter((p) => p.category === product?.category && p.id !== product?.id)
		.slice(0, 4);
	$: thumbnailsImg = product
		? [
				product.image,
				'/hi2.jpeg',
				'/hi4.jpeg',
				'/new3.webp',
				'/neww2.webp',
				'/newww3.webp',
				'/newww5.webp'
			]
		: [];
	let start = 0;
	let visibleCount = 4;
	function next() {
		if (start + visibleCount < thumbnailsImg.length) start++;
	}
	function prev() {
		if (start > 0) start--;
	}
	$: visibleImages = () => thumbnailsImg.slice(start, start + visibleCount);
</script>

{#if product}
	<section class="pt-16 px-6 md:px-16">
		<div class=" flex justify-center px-66 gap-12">
			<div class="flex-1 sticky top-32 self-start">
				<!-- Image -->
				<img
					src={product.image}
					alt={product.title}
					class=" w-full h-[450px] rounded-xl bg-gray-100"
				/>

				<!-- Thumbnails -->
				<div class="flex items-center justify-center gap-3 mt-6">
					<button
						on:click={prev}
						disabled={start === 0}
						class="text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed"
					>
						<ChevronLeft />
					</button>

					<div class="flex gap-3">
						{#each visibleImages() as img}
							<img
								src={img}
								alt={product.title}
								class="w-32 h-24 rounded-lg border cursor-pointer hover:border-black transition-all"
								on:click={() => (product.image = img)}
							/>
						{/each}
					</div>
					<button
						on:click={next}
						disabled={start + visibleCount >= thumbnailsImg.length}
						class="text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed"
						><ChevronRight /></button
					>
				</div>
			</div>

			<!-- Info -->
			<div class="flex-1">
				<h1 class="text-3xl font-semibold mb-8">
					{product.title}
				</h1>

				<p class="text-md mb-2">
					{product.price.toLocaleString()}.00 BDT
				</p>

				<p class="text-xs font-light text-gray-600 mb-4">Shipping calculated at checkout.</p>

				<!-- Color -->
				<div class="mb-6">
					<p class="text-base mb-1 text-gray-600">Color: {color}</p>
					<div
						class="w-8 h-8 border-2 mt-4 border-gray-600 flex items-center rounded justify-center"
					>
						<div class="border-gray-300 border-2 w-6 h-6 rounded"></div>
					</div>
				</div>

				<!-- Size -->
				<div class="text-base mb-10 text-gray-600">
					<p class="font-medium mb-2">Size</p>
					<div class="flex gap-4 flex-wrap">
						{#each sizes as size}
							<button
								class="px-6 py-2 border rounded-full
							{selectedSize === size ? 'bg-black text-white' : ''}"
								on:click={() => (selectedSize = size)}
							>
								{size}
							</button>
						{/each}
					</div>
				</div>
				<div class="mb-6">
					<button
						on:click={() => (showSizeGuide = true)}
						class="text-sm text-gray-700 underline decoration-1 hover:decoration-2"
					>
						SIZE GUIDE
					</button>
				</div>

				{#if product.inStock === true}
					<div class="flex items-center gap-2 mb-4">
						<div class="bg-green-200 rounded-full w-4 h-4 flex items-center justify-center">
							<div class="bg-white w-3 h-3 rounded-full flex items-center justify-center">
								<div class="bg-green-400 w-2.5 h-2.5 rounded-full"></div>
							</div>
						</div>
						<h1 class=" font-medium">In Stock</h1>
					</div>
				{:else if product.inStock === false}
					<div class="flex items-center gap-2 mb-4">
						<div class="bg-yellow-200 rounded-full w-4 h-4 flex items-center justify-center">
							<div class="bg-white w-3 h-3 rounded-full flex items-center justify-center">
								<div class="bg-yellow-400 w-2.5 h-2.5 rounded-full"></div>
							</div>
						</div>
						<h1 class=" font-medium">Low Stock</h1>
					</div>
				{:else}
					<div class="flex items-center gap-2 mb-4">
						<div class="bg-red-200 rounded-full w-4 h-4 flex items-center justify-center">
							<div class="bg-white w-3 h-3 rounded-full flex items-center justify-center">
								<div class="bg-red-400 w-2.5 h-2.5 rounded-full"></div>
							</div>
						</div>
						<h1 class=" font-medium">Out of Stock</h1>
					</div>
				{/if}

				<p class="text-md text-gray-600 mb-6">
					{product.id}-{selectedSize}
				</p>

				<!-- Quantity -->
				<div class="text-gray-600">
					<h1 class=" mb-2 text-sm">Quantity</h1>
					<div class="w-36 flex items-center gap-8 mb-6 px-5 py-3 border">
						<button on:click={() => (qty = Math.max(1, qty - 1))} class="">−</button>
						<span>{qty}</span>
						<button on:click={() => qty++} class="">+</button>
					</div>
				</div>

				<!-- Buttons -->
				<div class="  mb-8 space-y-3">
					<button
						class="w-full py-3 border rounded-lg shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
					>
						Add to cart
					</button>
					<button
						class=" w-full py-3 bg-black text-white rounded-lg shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
					>
						Buy it now
					</button>
				</div>

				<div>
					<Size />
				</div>
				<div class="text-center">
					<h1 class="text-md font-bold text-gray-600">{product.title} - NEW ARRIVAL</h1>
					<p class=" text-gray-500">Olive Grey Panjabi in Fine Cotton with subtle embroidery</p>
				</div>
				<div class="mt-20 mb-8 space-y-2">
					<h1 class="mb-4 font-bold">Product Details:</h1>
					<h2>* <span class="text-md font-bold">Price:</span> {product.price}</h2>
					<h2>* <span class="text-md font-bold">Color:</span> {product.colors}</h2>
					<h2>* <span class="text-md font-bold">Material:</span> {product.price}</h2>
					<h2>* <span class="text-md font-bold">Fit:</span> {product.price}</h2>
					<div class="flex gap-4 flex-wrap">
						<h2>* <span class="text-md font-bold">Size Options:</span> {product.sizes},</h2>
					</div>
				</div>
				<div
					class="border-t-1 border-gray-300 t-12 flex items-center justify-between text-gray-600"
				>
					<h1 class="p-4 flex items-center gap-2"><Heart />Care</h1>
					<ChevronDown />
				</div>
				<div class="border-t-1 text-gray-600 border-gray-300 t-12">
					<h1 class="p-4 flex items-center gap-2 mt-4"><Download />Share</h1>
				</div>
			</div>
		</div>

		<!-- Recommended -->
		<div class="mt-20 mb-12">
			<h2 class=" px-52 text-2xl font-semibold mb-6">Recommended for you</h2>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-52">
				{#each recommended as item}
					<a href={`/products/${item.id}`} class="group">
						<img src={item.image} alt={item.title} class="w-full h-80 rounded-lg mb-3" />
						<p class="text-sm">{item.title}</p>
						<p class="font-semibold">
							{item.price.toLocaleString()} BDT
						</p>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if showSizeGuide}
	<!-- Overlay -->
	<div
		class="fixed inset-0 bg-gray-100 bg-opacity-0 flex items-center justify-center"
		on:click={() => (showSizeGuide = false)}
	>
		<!-- Modal -->
		<div
			class="bg-white w-full max-w-7xl mx-4 pt-12 rounded-xl pb-32 px-12 relative"
			on:click|stopPropagation
		>
			<!-- Close Button -->
			<button
				class="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
				on:click={() => (showSizeGuide = false)}
			>
				✕
			</button>
			<h1 class="text-2xl font-semibold">Size Guide</h1>

			<p class=" mb-8">All measurements are in inches (in).</p>

			<table class="w-full text-center rounded-xl">
				<thead class="rounded-full">
					<tr class="text-lg font-semibold bg-black text-white rounded-2xl">
						<th class="py-3">SIZE</th>
						<th class="py-3">LENGTH (in)</th>
						<th class="py-3">CHEST (in)</th>
					</tr>
				</thead>

				<tbody class="text-lg">
					<tr class="bg-gray-50">
						<td class="py-3 font-medium">M</td>
						<td>38</td>
						<td>40</td>
					</tr>
					<tr>
						<td class="py-3 font-medium">L</td>
						<td>40</td>
						<td>42</td>
					</tr>
					<tr class="bg-gray-50">
						<td class="py-3 font-medium">XL</td>
						<td>42</td>
						<td>44</td>
					</tr>
					<tr>
						<td class="py-3 font-medium">2XL</td>
						<td>44</td>
						<td>46</td>
					</tr>
					<tr class="bg-gray-50">
						<td class="py-3 font-medium">3XL</td>
						<td>46</td>
						<td>50</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
{/if}
