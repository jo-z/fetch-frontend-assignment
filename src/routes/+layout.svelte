<script lang="ts">
	let { children } = $props();
</script>

<header>
	<h1>Shelter Luv</h1>
</header>

{@render children()}

<style>
	:global(:root) {
		--light: #ffdcf4;
		--light-accent: #adb7d2;
		--mid: #d196b3;
		--mid-accent: #9b84b4;
		--dark: #9d3c70;
		--dark-accent: #6c2950;
		--dark-contrast: #ba2460;
	}
	:global(body) {
		background-color: var(--light);
		color: var(--dark);
		font-family: 'Cabin', sans-serif;
		font-size: 1.1875rem;
	}
	:global(:focus-visible) {
		outline-color: var(--dark-contrast);
		outline-width: 0.125rem;
		outline-style: solid;
	}
	@font-face {
		font-family: 'Paws';
		src: url(/fonts/KittenPaws-Regular.ttf) format('truetype');
	}
	@font-face {
		font-family: 'Cabin';
		src: url(/fonts/Cabin-Regular.ttf) format('truetype');
	}
	@font-face {
		font-family: 'Cabin';
		src: url(/fonts/Cabin-Bold.ttf) format('truetype');
		font-weight: bold;
	}
	@font-face {
		font-family: 'Cabin';
		src: url(/fonts/Cabin-Italic.ttf) format('truetype');
		font-style: italic;
	}
	@font-face {
		font-family: 'Cabin';
		src: url(/fonts/Cabin-BoldItalic.ttf) format('truetype');
		font-style: italic;
		font-weight: bold;
	}
	h1 {
		font-family: 'Paws', cursive;
		font-size: 6rem;
		text-align: center;
	}
</style>
