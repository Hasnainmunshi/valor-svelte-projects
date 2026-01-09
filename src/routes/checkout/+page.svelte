<script lang="ts">
	import { cartItems, cartOpen } from '$lib/stores/cart';
	import { Handbag } from '@lucide/svelte';
	import { derived } from 'svelte/store';

	// Shipping selection
	let shippingArea: 'dhaka' | 'outside' = 'dhaka';
	$: shippingCost = shippingArea === 'dhaka' ? 100 : 80;

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

	let billingSameAsShipping: boolean = true;

	let billingFirstName = '';
	let billingLastName = '';
	let billingAddress = '';
	let billingCity = '';
	let billingPostal = '';
	let billingPhone = '';
	let discountCode = '';

	let errors = {
		email: false,
		lastName: false,
		address: false,
		phone: false,
		city: false,
		billingLastName: false,
		billingAddress: false,
		billingCity: false
	};

	function validation() {
		errors.email = email.trim() === '';
		errors.lastName = lastName.trim() === '';
		errors.address = address.trim() === '';
		errors.phone = phone.trim() === '';
		errors.city = city.trim() === '';
		errors.billingLastName = billingLastName.trim() === '';
		errors.billingAddress = billingAddress.trim() === '';
		errors.billingCity = billingCity.trim() === '';

		return !Object.values(errors).some(Boolean);
	}

	function placeOrder() {
		if (!validation()) {
			return;
		}

		alert(`Order placed!\nTotal: ৳${total.toLocaleString()}`);
		cartOpen.set(false);
	}
</script>

<div class="overflow-auto flex h-screen flex-col lg:flex-row">
	<!-- LEFT: Form -->
	<div class="flex-1 flex justify-end">
		<div class="max-w-[550px] w-full pr-10 py-8 space-y-2">
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
					class={`w-full border px-3 py-3  rounded ${errors.email ? 'border-red-500 ' : 'border-gray-300'}`}
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
						class={`w-full border px-3 py-3  rounded border-gray-300`}
					/>
					<input
						type="text"
						placeholder="Last name"
						bind:value={lastName}
						class={`w-full border px-3 py-3  rounded ${errors.lastName ? 'border-red-500 ' : 'border-gray-300'}`}
					/>
				</div>
				<input
					type="text"
					placeholder="Address"
					bind:value={address}
					class={`w-full border px-3 py-3  rounded ${errors.address ? 'border-red-500 ' : 'border-gray-300'}`}
				/>
				<div class="flex gap-3">
					<input
						type="text"
						placeholder="City"
						bind:value={city}
						class={`w-full border px-3 py-3  rounded ${errors.city ? 'border-red-500 ' : 'border-gray-300'}`}
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
					class={`w-full border px-3 py-3  rounded ${errors.phone ? 'border-red-500 ' : 'border-gray-300'}`}
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
			<div class=" rounded-xl space-y-3 mt-6">
				<h2 class="font-bold text-xl">Payment</h2>
				<p class="text-gray-500 text-sm">All transactions are secure and encrypted.</p>

				<label class="block border border-gray-300 rounded-xl bg-gray-50">
					<div class=" p-4 border-b border-gray-300 rounded-t-xl">
						<h1 class=" font-medium text-gray-600">Cash on Delivery (COD)</h1>
					</div>

					<p class="p-4 text-sm text-gray-600">
						Pay conveniently with Cash on Delivery (COD). You can pay in cash when your order is
						delivered to your doorstep.
					</p>
				</label>
			</div>

			<!-- BILLING ADDRESS -->
			<div class="mt-8">
				<h2 class="font-semibold mb-2">Billing address</h2>

				<div class="space-y-3">
					<!-- SAME AS SHIPPING -->
					<label
						class={`flex items-center gap-3 p-4 border rounded cursor-pointer transition
			${billingSameAsShipping ? 'bg-gray-100 border-black' : 'border-gray-100'}`}
					>
						<input
							type="radio"
							bind:group={billingSameAsShipping}
							value={true}
							class="accent-black"
						/>
						<span>Same as shipping address</span>
					</label>

					<!-- DIFFERENT BILLING -->
					<label
						class={`flex items-center gap-3 p-4 border rounded cursor-pointer transition
			${!billingSameAsShipping ? 'bg-gray-200 border-black' : 'border-gray-300'}`}
					>
						<input
							type="radio"
							bind:group={billingSameAsShipping}
							value={false}
							class="accent-black"
						/>
						<span>Use a different billing address</span>
					</label>

					<!-- BILLING FORM -->
					{#if !billingSameAsShipping}
						<div class="space-y-3 border border-gray-300 rounded p-4 mb-2">
							<div class="text-sm text-gray-600">Bangladesh (BD)</div>

							<div class="flex gap-3">
								<input
									type="text"
									placeholder="First name (optional)"
									bind:value={billingFirstName}
									class={`w-full border px-3 py-3  rounded border-gray-300`}
								/>
								<input
									type="text"
									placeholder="Last name"
									bind:value={billingLastName}
									class={`w-full border px-3 py-3  rounded ${errors.billingLastName ? 'border-red-500 ' : 'border-gray-300'}`}
								/>
							</div>

							<input
								type="text"
								placeholder="Address"
								bind:value={billingAddress}
								class={`w-full border px-3 py-3  rounded ${errors.billingAddress ? 'border-red-500 ' : 'border-gray-300'}`}
							/>

							<div class="flex gap-3">
								<input
									type="text"
									placeholder="City"
									bind:value={billingCity}
									class={`w-full border px-3 py-3  rounded ${errors.billingCity ? 'border-red-500 ' : 'border-gray-300'}`}
								/>
								<input
									type="text"
									placeholder="Postal code (optional)"
									bind:value={billingPostal}
									class="w-full border border-gray-300 rounded px-3 py-3"
								/>
							</div>

							<input
								type="text"
								placeholder="Phone (optional)"
								bind:value={billingPhone}
								class={`w-full border px-3 py-3  rounded border-gray-300`}
							/>
						</div>
					{/if}
				</div>
			</div>
			<div class=" border-b-1 pb-10 border-gray-300">
				<button class="w-full bg-black text-white py-3 rounded font-bold" on:click={placeOrder}>
					Complete order
				</button>
			</div>
			<div class="flex justify-between items-center gap-2 underline pb-12 mt-2 font-light">
				<a href=""> Refund policy</a>
				<a href=""> Shipping</a>
				<a href=""> Privacy policy</a>
				<a href=""> Terms of service</a>
				<a href=""> Contact</a>
			</div>
		</div>
	</div>

	<!-- RIGHT: Order summary -->
	<div class="hidden lg:flex h-screen flex-1 bg-gray-100 justify-start sticky top-0">
		<div class="w-full lg:max-w-[520px] w-full p-10 pr-10 py-8 space-y-2">
			{#if $cartItems.length === 0}{:else}
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

				<div class="flex justify-between items-center gap-4 mt-4 mb-4">
					<input
						class="border p-4 border-gray-300 bg-white rounded-md"
						placeholder="Discount code"
						type="text"
						bind:value={discountCode}
					/>
					<button
						class={`border px-4 py-2 rounded ${discountCode.trim() ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-500'} `}
						disabled={!discountCode.trim()}>Apply</button
					>
				</div>

				<div class="space-y-1 text-sm">
					<div class="flex justify-between">
						<span>Subtotal · {$cartItems.length} items</span>
						<span>৳{$subtotal.toLocaleString()}</span>
					</div>
					<div class="flex justify-between">
						<span>Shipping</span>
						<span>৳{shippingCost}</span>
					</div>
					<div class="flex justify-between items-center font-semibold text-lg">
						<span>Total</span>
						<div class="flex items-center justify-center gap-2">
							<span class="font-light text-xs text-gray-500">BDT</span>
							<span> ৳{total.toLocaleString()}</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
