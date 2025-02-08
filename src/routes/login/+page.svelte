<script lang="ts">
	import { goto } from '$app/navigation';
	import { api } from '$lib/constants';
	let name = $state('');
	let email = $state('');
	let error = $state(0);
</script>

<form
	onsubmit={async (e) => {
		e.preventDefault();
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const response = await fetch(`${api}/auth/login`, {
			body: JSON.stringify({ name, email }),
			method: 'POST',
			headers,
			credentials: 'include'
		});
		if (response.status === 200) goto('/');
		else error = response.status;
	}}
>
	<label for="name">name:</label> <input required type="text" id="name" bind:value={name} />
	<label for="email">email:</label> <input required type="email" id="email" bind:value={email} />
	<input type="submit" value="login" />
	{#if error}
		{#if error === 500}
			<p>The server is having trouble. Please try again later</p>
		{:else}<p>There was an error logging in. Please check your credentials and try again</p>
		{/if}
	{/if}
</form>

<style>
</style>
