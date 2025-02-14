<script lang="ts">
	let { children } = $props();
	import { logout } from '$lib/api';
	import Button from '$lib/Button.svelte';
	import { page } from '$app/state';
	const path = $derived(page.url.pathname);
</script>

<nav>
	<a href="/" class:active={path === '/'}>Search</a><a
		href="/favorites"
		class:active={path === '/favorites'}>Favorites</a
	><a href="/match" class:active={path === '/match'}>Find Match</a><a
		href="/instructions"
		class:active={path === '/instructions'}>Instructions</a
	><Button onclick={logout}>Logout</Button>
</nav>

{@render children()}

<style>
	nav {
		display: flex;
		justify-content: space-around;
		align-items: baseline;
	}
	a {
		color: var(--dark-accent);
		text-decoration: none;
		padding: 0.4rem 0.75rem;
		border-radius: 5%;
	}

	.active {
		border-bottom: 2px solid var(--dark-accent);
	}
	a:hover {
		color: var(--mid-accent);
		transition: all ease-out 0.5s;
	}

	@media (width<=501px) {
		nav {
			flex-wrap: wrap;
		}
	}
</style>
