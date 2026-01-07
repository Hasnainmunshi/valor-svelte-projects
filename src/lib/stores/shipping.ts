import { writable, derived } from 'svelte/store';
import { cartItems } from '$lib/stores/cart';

export const shippingArea = writable<'dhaka' | 'outside'>('dhaka');

export const shippingCost = derived(shippingArea, ($area) => ($area === 'dhaka' ? 80 : 100));

export const cartSubtotal = derived(cartItems, ($items) =>
	$items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const grandTotal = derived(
	[cartSubtotal, shippingCost],
	([$subtotal, $shipping]) => $subtotal + $shipping
);
