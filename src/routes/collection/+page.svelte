<script>
	import { goto } from '$app/navigation';
	import { products } from '$lib/data/products';

	let newCollection = products.slice(0, 12);
</script>

<section class=" py-16 px-68 mt-10">
	<div>
		<h2 class="lg:text-4xl text-3xl font-semibold lg:font-bold">Collections</h2>
	</div>

	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
		{#each newCollection as item}
			<a href={`/products/${item.id}`} class="group block">
				<div class="w-full h-64 md:h-72 overflow-hidden rounded-lg bg-gray-100">
					<img
						src={item.image}
						alt={item.title}
						class="w-full h-full object-cover transition duration-300 group-hover:scale-105"
					/>
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
	<div class=" flex items-center justify-center mt-8">
		<button
			class="px-6 py-2 border border-black text-black rounded-lg shadow-xl transition hover:bg-black hover:text-white"
			>View all</button
		>
	</div>
</section>

<style>
	:global(img) {
		transition: transform 0.4s ease;
	}
</style>
