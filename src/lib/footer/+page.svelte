<script>
	import { Facebook, Instagram, Youtube } from '@lucide/svelte';
</script>

<footer class="bg-[#282b38] text-white mt-20">
	<div class="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
		<div class="">
			<!-- Legal -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Legal</h3>
				<ul class="space-y-2 text-gray-300">
					<li><a href="#" class="hover:text-white">Privacy Policy</a></li>
					<li><a href="#" class="hover:text-white">Terms of Service</a></li>
					<li><a href="#" class="hover:text-white">Return & Refund Policy</a></li>
					<li><a href="#" class="hover:text-white">Shipping Policy</a></li>
				</ul>
			</div>
			<!-- Company -->
			<div class="mt-12">
				<h3 class="text-lg font-semibold mb-4">Company</h3>
				<ul class="space-y-2 text-gray-300">
					<li><a href="#" class="hover:text-white">About Us</a></li>
					<li><a href="#" class="hover:text-white">Blog</a></li>
					<li><a href="#" class="hover:text-white">Contact Us</a></li>
				</ul>
			</div>

			<!-- Join Us -->
			<div class=" mt-8">
				<h3 class="text-lg font-semibold mb-4">Join Us for Exclusive Discounts & News</h3>

				<!-- Email input -->
				<div class="flex items-center bg-white rounded-md overflow-hidden">
					<input
						type="email"
						placeholder="Email"
						class="px-3 py-2 w-full text-black outline-none"
					/>
					<button class="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"> Submit </button>
				</div>
			</div>
			<!-- Social icons -->
			<div class="flex gap-4 mt-5">
				<a href="#" class="hover:opacity-70"><Facebook /></a>
				<a href="#" class="hover:opacity-70"><Instagram /></a>
				<a href="#" class="hover:opacity-70"><Youtube /></a>
			</div>
		</div>

		<!-- Information -->
		<div>
			<h3 class="text-lg font-semibold mb-4">Information</h3>
			<ul class="space-y-2 text-gray-300">
				<li><a href="#" class="hover:text-white">Exchange</a></li>
				<li><a href="#" class="hover:text-white">Size Guide</a></li>
				<li><a href="#" class="hover:text-white">Display Centers</a></li>
				<li><a href="#" class="hover:text-white">Contact Information</a></li>
			</ul>
		</div>

		<!-- Service Center -->
		<div>
			<h3 class="text-lg font-semibold mb-4">Service Center</h3>
			<ul class="space-y-2 text-gray-300">
				<li>+880 9613829039</li>
				<li>support@valor.com.bd</li>
			</ul>
		</div>
	</div>

	<!-- Bottom -->
	<div class="border-t mx-auto px-80 border-gray-700 py-12 text-gray-400 text-sm">
		<p class="">© 2025, VALOR</p>
	</div>
</footer>
