<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Menu, Search, ShoppingBag, User, X } from '@lucide/svelte';

	import { searchOpen } from '$lib/stores/search';
	import { cartCount } from '$lib/stores/cart';
	import { cartOpen } from '$lib/stores/cart';
	import { isLoggedIn } from '$lib/stores/auth';

	let open = false;

	const links = [
		{ name: 'New Arrivals', href: '/collections/view-arrivals' },
		{ name: 'ELEGANCE', href: '/collections/view-elegance' },
		{ name: 'SAHARA', href: '/collections/view-sahara' },
		{ name: 'LUXURY', href: '/collections/view-luxury' },
		{ name: 'PLATINUM', href: '/collections/view-platinum' },
		{ name: 'Kids Style', href: '/collections/kids-style' },
		{ name: 'All Panjabi', href: '/collections/view-allPanjabi' },
		{ name: 'Trouser', href: '/collections/trouser' },
		{ name: 'Flash Sale', href: '/collections/flash-sale' },
		{ name: 'Value Fest 🔥', href: '/collections/value-fest' }
	];

	$: currentPath = $page.url.pathname;
</script>

<nav class="px-6 md:px-10 bg-white fixed shadow w-full z-50">
	<div class="max-w-7xl mx-auto flex justify-between items-center py-3">
		<!-- Mobile Menu -->
		<button class="md:hidden" on:click={() => (open = !open)}>
			{#if open}
				<X class="h-7 w-7" />
			{:else}
				<Menu class="h-7 w-7" />
			{/if}
		</button>

		<!-- Logo -->
		<a href="/">
			<img src="/p.avif" alt="Valor Logo" class="h-20 md:h-32" />
		</a>

		<!-- Desktop Links -->
		<ul class="hidden md:flex gap-6 font-light">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class={currentPath === link.href ? 'underline font-semibold' : 'hover:underline'}
					>
						{link.name}
					</a>
				</li>
			{/each}

			{#if $isLoggedIn}
				<li>
					<a href="/orders" class="hover:underline font-medium"> Orders </a>
				</li>
			{/if}
		</ul>

		<!-- Icons -->
		<div class="flex gap-5 items-center">
			<!-- Search -->
			<button on:click={() => searchOpen.set(true)}>
				<Search class="h-6 w-6" />
			</button>

			<!-- Auth -->
			{#if $isLoggedIn}
				<button on:click={() => goto('/account')}>
					<User class="h-6 w-6" />
				</button>
			{:else}
				<button on:click={() => goto('/auth/login')}>
					<User class="h-6 w-6" />
				</button>
			{/if}

			<!-- Cart -->
			<button class="relative" on:click={() => cartOpen.set(true)}>
				<ShoppingBag class="h-6 w-6" />
				{#if $cartCount > 0}
					<span
						class="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
					>
						{$cartCount}
					</span>
				{/if}
			</button>
		</div>
	</div>
</nav>
