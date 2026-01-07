<script lang="ts">
	import { cartItems, cartOpen } from '$lib/stores/cart';
	import { Handbag } from '@lucide/svelte';
	import { derived } from 'svelte/store';

	// Shipping selection
	let shippingArea: 'dhaka' | 'outside' = 'dhaka';
	$: shippingCost = shippingArea === 'dhaka' ? 80 : 100;

	// Subtotal and total
	const subtotal = derived(cartItems, ($cart) =>
		$cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
	);
	$: total = $subtotal + shippingCost;

	// Customer info
	let firstName = '';
	let lastName = '';
	let email = '';
	let phone = '';
	let address = '';
	let city = '';
	let postal = '';
	let emailInfo = false;
	let saveInfo = false;
	let paymentMethod: 'cod' | null = 'cod';

	function placeOrder() {
		alert(`Order placed!\nTotal: ৳${total.toLocaleString()}`);
		cartOpen.set(false); // optionally close sidebar
	}
</script>

<div class="max-w-7xl mx-auto px-6 mt-8 grid md:grid-cols-2 gap-10">
	<!-- LEFT: Form -->

	<div class="space-y-2">
		<div class="flex justify-between items-center">
			<a href="/">
				<img src="/p.avif" alt="Valor Logo" class="h-20 md:h-32" />
			</a>

			<Handbag />
		</div>
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold">Contact</h1>
			<a class="underline" href="/"> signin </a>
		</div>

		<!-- Contact -->
		<div class=" space-y-3">
			<input
				type="text"
				placeholder="Email or mobile phone number"
				bind:value={email}
				class="w-full border px-3 py-3 border-gray-300 rounded"
			/>
			<label class="flex items-center gap-2 text-sm">
				<input type="checkbox" bind:checked={emailInfo} />
				Email me with news and offers
			</label>
		</div>

		<!-- Delivery -->
		<div class=" space-y-3 mt-10">
			<h2 class="text-xl font-bold">Delivery</h2>
			<div class="flex gap-3">
				<input
					type="text"
					placeholder="First name (optional)"
					bind:value={firstName}
					class="w-full border rounded px-3 py-3 border-gray-300"
				/>
				<input
					type="text"
					placeholder="Last name"
					bind:value={lastName}
					class="w-full border rounded px-3 py-3 border-gray-300"
				/>
			</div>
			<input
				type="text"
				placeholder="Address"
				bind:value={address}
				class="w-full border rounded px-3 py-3 border-gray-300"
			/>
			<div class="flex gap-3">
				<input
					type="text"
					placeholder="City"
					bind:value={city}
					class="w-full border rounded px-3 py-3 border-gray-300"
				/>
				<input
					type="text"
					placeholder="Postal code (optional)"
					bind:value={postal}
					class="w-full border rounded px-3 py-3 border-gray-300"
				/>
			</div>
			<input
				type="text"
				placeholder="Phone"
				bind:value={phone}
				class="w-full border rounded px-3 py-3 border-gray-300"
			/>
			<label class="flex items-center gap-2 text-sm">
				<input type="checkbox" bind:checked={saveInfo} />
				Save this information for next time
			</label>
		</div>

		<!-- Shipping method -->
		<div class=" mt-6">
			<h2 class=" font-bold mb-6">Shipping method</h2>
			<label
				class="flex justify-between items-center p-3 border border-gray-300 rounded cursor-pointer"
			>
				<div class="flex gap-2">
					<input type="radio" name="shipping" value="outside" bind:group={shippingArea} />
					<span>INSIDE DHAKA</span>
				</div>
				<span>৳80.00</span>
			</label>

			<label
				class="flex justify-between items-center p-3 border border-gray-300 rounded cursor-pointer"
			>
				<div class="flex gap-2">
					<input type="radio" name="shipping" value="dhaka" bind:group={shippingArea} />
					<span>OUTSIDE DHAKA</span>
				</div>
				<span>৳100.00</span>
			</label>
		</div>

		<!-- Payment -->
		<div class=" p-4 rounded space-y-1">
			<h2 class="font-bold">Payment</h2>
			<p class="text-gray-500">All transactions are secure and encrypted.</p>
			<label class="flex items-center gap-2 p-3 border rounded cursor-pointer">
				Cash on Delivery (COD)
			</label>
		</div>
	</div>

	<!-- RIGHT: Order summary -->
	<div class="border p-4 rounded space-y-4">
		<h2 class="font-semibold text-lg">Order summary</h2>

		{#if $cartItems.length === 0}
			<p>Your cart is empty.</p>
		{:else}
			{#each $cartItems as item}
				<div class="flex justify-between items-center py-2">
					<div class="flex gap-3 items-center">
						<img src={item.image} alt={item.title} class="w-16 h-16 object-cover rounded" />
						<div>
							<p class="font-medium">{item.title}</p>
							<p class="text-sm text-gray-500">{item.color} / {item.size} × {item.quantity}</p>
						</div>
					</div>
					<p class="font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
				</div>
			{/each}

			<hr />

			<div class="space-y-1 text-sm">
				<div class="flex justify-between">
					<span>Subtotal · {$cartItems.length} items</span>
					<span>৳{$subtotal.toLocaleString()}</span>
				</div>
				<div class="flex justify-between">
					<span>Shipping</span>
					<span>৳{shippingCost}</span>
				</div>
				<div class="flex justify-between font-semibold text-lg">
					<span>Total</span>
					<span>৳{total.toLocaleString()}</span>
				</div>
			</div>

			<button class="w-full bg-black text-white py-3 rounded" on:click={placeOrder}>
				Submit Order
			</button>
		{/if}
	</div>
</div>
