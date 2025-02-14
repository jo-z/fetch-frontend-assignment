<script lang="ts">
	import { login } from '$lib/api';
	import Instructions from '../(navigation)/instructions/+page.svelte';
	let name = $state('');
	let email = $state('');
	let error = $state(0);
</script>

<svelte:head>
	<title>Login to Shelter Luv!</title>
</svelte:head>
<Instructions />

<form
	onsubmit={async (e) => {
		e.preventDefault();
		error = (await login({ name, email })) || 0;
	}}
>
	<label for="name">Name:</label> <input required type="text" id="name" bind:value={name} />
	<label for="email">Email:</label> <input required type="email" id="email" bind:value={email} />
	<input type="submit" value="login" />
	{#if error}
		{#if error === 500}
			<p>The server is having trouble. Please try again later</p>
		{:else}<p>There was an error logging in. Please check your credentials and try again</p>
		{/if}
	{/if}
</form>

<style>
	input[type='submit'] {
		border: none;
		background-color: var(--dark-accent);
		color: var(--light);
		padding: 0.4rem 0.75rem;
		border-radius: 0.125rem;
		font-size: 1rem;
	}
	input {
		border-color: var(--mid);
		padding: 0.125rem 0rem;
		border-style: solid;
		background-color: var(--dark);
		color: var(--light-accent);
	}

	* {
		text-align: center;
	}
	p {
		margin: 2rem 6rem;
	}
</style>
