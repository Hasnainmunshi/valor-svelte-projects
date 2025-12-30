<script>
	export let item;
</script>

<a href={`/products/${item.id}`} class="block group relative">
	<img
		src={item.image}
		class="rounded-lg w-full h-80 object-cover transition group-hover:scale-105 duration-300"
	/>

	{#if item.discount}
		<span class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
			-{item.discount}%
		</span>
	{/if}

	<p class="mt-2 text-sm">{item.title}</p>

	<div class="flex gap-2 text-sm">
		<span class="font-semibold text-green-700">{item.salePrice} BDT</span>
		<span class="line-through text-gray-500">{item.price} BDT</span>
	</div>

	{#if !item.inStock}
		<p class="text-red-600 text-xs">Sold Out</p>
	{/if}
</a>
