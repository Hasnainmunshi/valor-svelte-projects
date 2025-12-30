<script>
	import { goto } from '$app/navigation';
	import { ArrowRight } from '@lucide/svelte';
	const collections = [
		{ name: ' ELEGANCE', img: '/new2.webp', slug: 'view-elegance' },
		{ name: ' SAHARA', img: '/new1.webp', slug: 'view-sahara' },
		{ name: ' TROUSER', img: '/new3.webp', slug: 'trouser' },
		{ name: ' New Arrival', img: '/new5.webp', slug: 'view-arrivals' },
		{ name: ' Value Fest 🔥', img: '/new2.webp', slug: 'value-fest' },
		{ name: ' PLATINUM', img: '/new1.webp', slug: 'view-platinum' },
		{ name: ' LUXURY', img: '/new3.webp', slug: 'view-luxury' },
		{ name: ' Flash Sale', img: '/new5.webp', slug: 'flash-sale' },
		{ name: ' Valor Kids Collection', img: '/new1.webp', slug: 'valor-kids' },
		{ name: ' All Panjabi', img: '/new3.webp', slug: 'view-allPanjabi' }
	];

	const previewCards = collections.slice(0, 4);
</script>

<section class="bg-gray-100 py-12 mt-20">
	<h2 class="lg:text-4xl text-2xl font-semibold px-10">Discover Our Most Loved Collections!</h2>

	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 px-12">
		{#each previewCards as item}
			<div on:click={() => goto(`/collections/${item.slug}`)} class="cursor-pointer group">
				<img
					class="w-full h-52 lg:h-96 object-cover rounded group-hover:scale-105 duration-300"
					src={item.img}
					alt={item.name}
				/>

				<div class="flex items-center justify-center mt-4 gap-2">
					<h2 class="font-semibold">{item.name}</h2>
					<ArrowRight class="w-4 h-4 transition group-hover:translate-x-1" />
				</div>
			</div>
		{/each}
	</div>

	<div class="flex items-center justify-center mt-8">
		<button
			on:click={() => goto('/collections/view-arrivals')}
			class="px-6 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
		>
			View all
		</button>
	</div>
</section>
