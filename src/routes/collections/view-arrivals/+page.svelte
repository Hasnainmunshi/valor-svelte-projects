<script>
	import { products } from '$lib/data/products';

	let newCollection = products.slice(0, 30);
</script>

<section class="mt-6">
	<div class="bg-gray-200 p-8">
		<h2 class=" lg:text-4xl text-3xl lg:pl-52 font-semibold lg:font-bold">New Arrivals</h2>
	</div>

	<div class=" py-16 px-6 lg:px-52 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-2">
		{#each newCollection as item}
			<a href={`/products/${item.id}`} class="group block">
				<div class="w-full h-64 md:h-72 overflow-hidden rounded-lg bg-gray-100 relative">
					<img
						src={item.image}
						alt={item.title}
						class="w-full h-full object-cover transition duration-300 group-hover:opacity-0"
					/>
					{#if item.hoverImage}
						<img
							src={item.hoverImage}
							alt={item.title + 'alternate'}
							class="w-full h-72 object-cover absolute top-0 left-0 opacity-0 transition duration-300 group-hover:opacity-100"
						/>
					{/if}
				</div>

				<div class="mt-3">
					<p class="text-gray-800 text-sm md:text-base font-light">
						{item.title}
					</p>
					<p class="text-gray-900 font-semibold text-sm md:text-lg">
						{item.price.toLocaleString()} BDT
					</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	/* Optional smooth fade animation */
	:global(img) {
		transition: transform 0.4s ease;
	}
</style>
