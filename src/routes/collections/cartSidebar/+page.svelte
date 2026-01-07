<script>
	import { cartItems, cartOpen, increaseQty, decreaseQty, removeItem } from '$lib/stores/cart';
	import { goto } from '$app/navigation';
	import { Trash2, X } from '@lucide/svelte';
	import { derived } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Calculate total
	const total = derived(cartItems, ($items) =>
		$items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	);

	function checkout() {
		goto('/checkout');
		cartOpen.set(false);
	}
</script>

{#if $cartOpen}
	<!-- Overlay -->
	<div class="fixed inset-0 bg-black/30 z-40" on:click={() => cartOpen.set(false)} />

	<!-- Sidebar -->
	<div
		class="fixed right-0 top-0 w-[400px] h-full bg-white shadow-lg z-50 p-6 flex flex-col"
		in:fly={{ x: 400, duration: 300, easing: cubicOut }}
		out:fly={{ x: 400, duration: 300, easing: cubicOut }}
	>
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-semibold">Your Cart</h2>
			<button on:click={() => cartOpen.set(false)}>
				<X class="text-gray-500 h-6 w-6" />
			</button>
		</div>
		<div class="flex justify-between mb-4 items-center border-b pb-4 text-gray-400 text-xs">
			<h1>PRODUCT</h1>
			<h1>TOTAL</h1>
		</div>

		<div class="flex-1 overflow-y-auto mt-2">
			{#if $cartItems.length === 0}
				<p>Your cart is empty.</p>
			{:else}
				{#each $cartItems as item}
					<div class="flex justify-between">
						<div class="flex gap-3">
							<img src={item.image} alt={item.name} class="h-16 w-16 object-cover" />
							<div class="flex-1 space-y-1">
								<h3 class="font-semibold w-44">{item.title}</h3>
								<div class="text-gray-600">
									<p class="font-medium">{item.price.toLocaleString()} BDT</p>
									<p class="text-sm">Color: {item.color}</p>
									<p class="text-sm">Size: {item.size}</p>
									<div class="flex justify-between items-center text-gray-500 mt-4 mb-8">
										<div class="w-32 flex items-center gap-6 px-5 py-3 border">
											<button on:click={() => decreaseQty(item.id, item.size)}> - </button>
											<span>{item.quantity}</span>
											<button on:click={() => increaseQty(item.id, item.size)}> + </button>
										</div>
										<button
											class="text-gray-400 hover:text-red-500"
											on:click={() => removeItem(item.id, item.size)}
											><Trash2 class="h-4 w-4" /></button
										>
									</div>
								</div>
							</div>
						</div>
						<div>
							<p class="mt-1 font-semibold">
								{(item.price * item.quantity).toLocaleString()}.00
							</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Footer -->
		<div class="mt-4 border-t pt-4">
			<textarea placeholder="Order special instructions" class="w-full border rounded p-2 mb-3"
			></textarea>
			<div class="flex items-center justify-between mb-2">
				<p class="font-semibold">Estimated total:</p>
				<h1 class="text-gray-500">{$total.toLocaleString()}.00 BDT</h1>
			</div>

			<p class="text-xs text-gray-500 mb-4">
				Taxes, discounts and
				<a
					href="#"
					on:click|preventDefault={() => {
						cartOpen.set(false);
						goto('/collections/shippingInfo');
					}}
					class="font-normal hover:font-bold underline hover:underline-offset-1 transition-all"
				>
					shipping
				</a>
				calculated at checkout.
			</p>

			<button class="w-full bg-black text-white py-3 rounded-xl" on:click={checkout}>
				Check out
			</button>
		</div>
	</div>
{/if}
