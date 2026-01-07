<script>
	import { goto } from '$app/navigation';

	let email = '';
</script>

<section class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
		<div class="flex items-center justify-center">
			<img src="/logo.avif" alt="logo" />
		</div>
		<!-- Title -->
		<h1 class="text-2xl font-bold text-gray-900 mb-2">Sign in</h1>
		<p class="text-gray-600 mb-6">Sign in or create an account</p>

		<!-- Button -->
		<button
			class="w-full bg-[#5433EB] text-white py-3 rounded-lg font-semibold
	       hover:bg-[#5455EB] active:scale-[0.98]
	       transition-all duration-200 shadow-md hover:shadow-lg"
		>
			Sign in with shop
		</button>

		<!-- OR divider -->
		<div class="flex items-center my-6">
			<div class="flex-1 h-[1px] bg-gray-300"></div>
			<span class="px-3 text-gray-500 text-sm">or</span>
			<div class="flex-1 h-[1px] bg-gray-300"></div>
		</div>

		<!-- Description -->
		<p class="text-gray-700 text-sm mb-4">
			Enter your email and we'll send you a verification code
		</p>

		<!-- Email input -->
		<input
			type="email"
			bind:value={email}
			placeholder="Email"
			class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none mb-4"
		/>

		<!-- Button -->
		<button
			on:click={() => goto('/auth/orders')}
			class="w-full py-3 rounded-lg {email ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}"
		>
			Continue
		</button>
	</div>
</section>
