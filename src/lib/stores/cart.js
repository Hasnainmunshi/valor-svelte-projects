import { writable, derived } from 'svelte/store';

export const cart = writable([]);

export const cartCount = derived(cart, ($cart) => $cart.reduce((sum, item) => sum + item.qty, 0));
