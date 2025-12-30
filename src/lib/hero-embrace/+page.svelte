<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<section class="px-4 md:px-20 lg:px-72">
	<!-- ===== Section 1 ===== -->
	<div class="flex flex-col md:flex-row mt-10 border-2 border-gray-200 overflow-hidden rounded-lg">
		<div class="flex-1">
			<img class="w-full h-full object-cover" src="/mh.webp" alt="" />
		</div>

		<div class="flex-1 shadow-xl">
			<div class="p-6 md:p-12 lg:p-20">
				<h1 class="text-2xl md:text-4xl font-bold">Embrace the Spirit of the Sahara.</h1>

				<h4 class="text-sm md:text-md font-light text-gray-600 mt-4 md:mt-6 md:w-[500px]">
					Our 2025 Sahara Panjabi Collection brings together bold design and timeless elegance,
					inspired by the vast beauty of the Sahara. Crafted with the finest materials, each piece
					offers a unique blend of comfort and style.
				</h4>

				<h2 class="mt-4 mb-4 text-gray-800 text-base md:text-lg">
					Discover the 2025 Sahara Panjabi Collection now!
				</h2>

				<button
					onclick={() => goto('/collections/view-sahara')}
					class="px-6 py-2 border bg-black text-white border-black rounded-lg shadow-md transition hover:bg-white hover:text-black"
				>
					Reveal Sahara
				</button>
			</div>
		</div>
	</div>

	<!-- ===== Section 2 ===== -->
	<div
		class="flex flex-col-reverse md:flex-row mt-6 border-2 border-gray-200 overflow-hidden rounded-lg"
	>
		<div class="flex-1 shadow-xl">
			<div class="p-6 md:p-12 lg:p-20">
				<h1 class="text-2xl md:text-4xl font-bold">
					Elegance is not just a style; it’s a timeless statement.
				</h1>

				<h4 class="text-sm md:text-md font-light text-gray-600 mt-4 md:mt-6 md:w-[500px]">
					Introducing our 2025 Elegance Panjabi Collection, Each piece is thoughtfully designed to
					blend modern aesthetics with classic charm, ensuring unmatched grace and comfort.
					Celebrate your style with the essence of elegance.
				</h4>

				<h2 class="mt-4 mb-4 text-gray-800 text-base md:text-lg">
					Explore the 2025 Elegance Collection now!
				</h2>

				<button
					class="px-6 py-2 border bg-black text-white border-black rounded-lg shadow-md transition hover:bg-white hover:text-black"
					onclick={() => goto('/collections/view-elegance')}
				>
					Shop Elegance
				</button>
			</div>
		</div>

		<!-- Image -->
		<div class="flex-1">
			<img class="w-full h-full object-cover" src="/mh2.webp" alt="" />
		</div>
	</div>
</section>
