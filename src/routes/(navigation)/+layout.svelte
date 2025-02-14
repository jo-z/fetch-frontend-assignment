<script lang="ts">
	let { children } = $props();
	import { logout } from '$lib/api';
	import Button from '$lib/Button.svelte';
</script>

<nav>
	<a href="/">Search</a><a href="/favorites">Favorites</a><a href="/match">Find Match</a><a
		href="/instructions">Instructions</a
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
		background-color: var(--dark-accent);
		color: var(--light);
		text-decoration: none;
		padding: 0.4rem 0.75rem;
		border-radius: 8%;
	}

	a:hover {
		color: var(--mid-accent);
	}
</style>
