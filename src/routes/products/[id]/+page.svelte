<script>
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';

	let qty = 1;
	let selectedSize = 'M';

	const sizes = ['M', 'L', 'XL', '2XL'];
	const color = 'Champagne Beige';

	$: product = products.find((p) => p.id === Number($page.params.id));

	$: recommended = products
		.filter((p) => p.category === product?.category && p.id !== product?.id)
		.slice(0, 4);
</script>

{#if product}
	<section class="pt-10 px-6 md:px-16">
		<div class=" flex justify-center gap-10">
			<div class="">
				<!-- Image -->
				<img src={product.image} alt={product.title} class=" w-full h-96 rounded-xl bg-gray-100" />
			</div>

			<!-- Info -->
			<div class="">
				<h1 class="text-3xl font-semibold mb-2">
					{product.title}
				</h1>

				<p class="text-md mb-4">
					{product.price.toLocaleString()}.00 BDT
				</p>

				<p class="text-xs font-light text-gray-600 mb-6">Shipping calculated at checkout.</p>

				<!-- Color -->
				<div class="mb-4">
					<p class="font-medium mb-1">Color:</p>
					<span class="inline-block px-4 py-2 border rounded-lg">
						{color}
					</span>
				</div>

				<!-- Size -->
				<div class="mb-6">
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
					<p class="text-sm text-gray-500 mt-2">SIZE GUIDE</p>
				</div>

				<p class="text-green-600 font-medium mb-4">In stock</p>

				<p class="text-sm text-gray-600 mb-6">
					SKU: {product.id}-{selectedSize}
				</p>

				<!-- Quantity -->
				<div class="flex items-center gap-4 mb-6">
					<button on:click={() => (qty = Math.max(1, qty - 1))} class="px-3 py-1 border">−</button>
					<span>{qty}</span>
					<button on:click={() => qty++} class="px-3 py-1 border">+</button>
				</div>

				<!-- Buttons -->
				<div class="  mb-20">
					<button class=" py-3 bg-black text-white rounded-lg"> Add to cart </button>
					<button class=" py-3 border rounded-lg"> Buy it now </button>
				</div>

				<!-- Description -->
				<div class=" pt-6">
					<h2 class="font-semibold mb-2">Luxury Panjabi – Perfect for Any Occasion</h2>
					<p class="text-gray-700 mb-2">
						{color} · Code {product.id}
					</p>
					<p class="text-gray-700 mb-4">
						Premium Jacquard Cotton · {product.price} BDT
					</p>
					<!-- <p class="text-gray-600">
						Crafted for soft, elegant, and occasion-ready comfort. Experience your premium look
						today.
					</p> -->
				</div>
			</div>
		</div>

		<!-- Recommended -->
		<div class="mt-20">
			<h2 class="text-2xl font-semibold mb-6">Recommended for you</h2>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
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
