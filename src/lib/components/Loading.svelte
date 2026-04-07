<span class="relative text-xl">
	<span class="animation absolute"></span>
	<span class="opacity-0">...</span>
</span>

<style>
	@keyframes ellipsis {
		33% {
			content: '.';
		}
		66% {
			content: '..';
		}
		99% {
			content: '...';
		}
	}

	.animation:after {
		animation: ellipsis 1s linear infinite;
		content: '';
	}
</style>
