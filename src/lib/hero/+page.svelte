<script>
	let images = ['/hi1.jpeg', '/hi2.jpeg', '/hi4.jpeg', '/hi3.jpeg'];
</script>

<div class="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
	<!-- Slider -->
	<div class="slider-container flex w-full h-full">
		{#each images as img}
			<img src={img} alt="banner" class="w-full slide-img" />
		{/each}
	</div>

	<!-- Button Center -->
	<div class="absolute inset-0 flex justify-center items-end lg:pb-16 md:pb-20 pb-12">
		<a
			href="/collections/view-elegance"
			class="px-4 md:px-6 py-2 md:py-3 bg-white text-sm md:text-lg font-semibold rounded-lg backdrop-blur-sm hover:bg-white/60 transition"
		>
			Shop Elegance
		</a>
	</div>
</div>

<style>
	.slider-container {
		width: 100%;
		height: 100%;
	}

	.slide-img {
		width: 100%;
		height: 60vh;
		object-fit: cover;
		animation: moveLR 10s ease-in-out infinite alternate;
	}

	@media (min-width: 768px) {
		.slide-img {
			height: 80vh;
		}
	}

	@keyframes moveLR {
		0% {
			transform: translateX(0px);
		}
		100% {
			transform: translateX(-25px);
		}
	}
</style>
