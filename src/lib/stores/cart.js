import { writable, derived } from 'svelte/store';

export const cartOpen = writable(false);

export const cartItems = writable([]);

/* ---------------- ADDTOCART ---------------- */
export function addToCart(item) {
	cartItems.update((items) => {
		const existing = items.find((i) => i.id === item.id && i.size === item.size);

		if (existing) {
			existing.quantity += item.quantity;
			return [...items];
		}

		return [...items, item];
	});
}

/* ---------------- QTY ++ ---------------- */
export function increaseQty(id, size) {
	cartItems.update((items) =>
		items.map((i) => (i.id === id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i))
	);
}

export function decreaseQty(id, size) {
	cartItems.update((items) =>
		items
			.map((i) => (i.id === id && i.size === size ? { ...i, quantity: i.quantity - 1 } : i))
			.filter((i) => i.quantity > 0)
	);
}

/* ---------------- DELETE ---------------- */
export function removeItem(id, size) {
	cartItems.update((items) => items.filter((i) => !(i.id === id && i.size === size)));
}

/* ---------------- DERIVED ---------------- */
export const cartCount = derived(cartItems, ($items) =>
	$items.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartTotal = derived(cartItems, ($items) =>
	$items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
