<script lang="ts">
	let { children } = $props();
	import { logout } from '$lib/api';
</script>

<nav>
	<a href="/">Search</a><a href="/match">Find Match</a><a href="/instructions">Instructions</a
	><button onclick={logout}>Logout</button>
</nav>

{@render children()}
