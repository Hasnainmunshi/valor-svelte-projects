<script>
	import { searchOpen, searchQuery } from '$lib/stores/search';
	import { products } from '$lib/data/products';
	import { goto } from '$app/navigation';

	$: results = products.filter((p) => p.title.toLowerCase().includes($searchQuery.toLowerCase()));
</script>

{#if $searchOpen}
	<div class="fixed inset-0 z-[999] bg-black/50 flex justify-center pt-24">
		<div class="bg-white w-full max-w-2xl rounded-lg p-6">
			<input
				type="text"
				placeholder="Search Panjabi..."
				class="w-full border px-4 py-3 rounded mb-4"
				bind:value={$searchQuery}
				autofocus
			/>

			<div class="max-h-96 overflow-y-auto">
				{#each results as item}
					<div
						class="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
						on:click={() => {
							searchOpen.set(false);
							searchQuery.set('');
							goto(`/products/${item.id}`);
						}}
					>
						<p class="font-medium">{item.title}</p>
						<p class="text-sm text-gray-600">
							{item.price.toLocaleString()} BDT
						</p>
					</div>
				{/each}

				{#if results.length === 0}
					<p class="text-gray-500 text-center py-6">No products found</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
