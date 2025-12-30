<script>
	import { products } from '$lib/data/products';
	import { goto } from '$app/navigation';
	// const products = [
	// 	{
	// 		id: 9929,
	// 		title: 'Kids Platinum Panjabi (776613)',
	// 		price: 990,
	// 		category: 'Sahara',
	// 		image: '/valor.webp'
	// 	},
	// 	{
	// 		id: 9929,
	// 		title: 'Kids Platinum Panjabi (776612)',
	// 		price: 990,
	// 		category: 'Sahara',
	// 		image: '/valor1.webp'
	// 	},
	// 	{
	// 		id: 9929,
	// 		title: 'Kids Platinum Panjabi (776612)',
	// 		price: 990,
	// 		category: 'Sahara',
	// 		image: '/valor2.jpg'
	// 	},
	// 	{
	// 		id: 9929,
	// 		title: 'Kids Platinum Panjabi (776612)',
	// 		price: 990,
	// 		category: 'Sahara',
	// 		image: '/valor3.jpg'
	// 	}
	// ];

	let newCollection = products.filter((item) => item.category === 'Kids Platinum').slice(0, 4);
</script>

<section class="pt-10 px-6 md:px-16">
	<h1 class="lg:text-4xl text-3xl font-semibold lg:font-bold mb-8 text-gray-800 lg:pl-52">
		Valor Kids Collection
	</h1>

	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
		{#each newCollection as item}
			<div class="group cursor-pointer" on:click={() => goto(`/products/${item.id}`)}>
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
			</div>
		{/each}
	</div>
	<div class=" flex items-center justify-center mt-8">
		<button
			on:click={() => goto('/collections/kids-style')}
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
