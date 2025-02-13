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
