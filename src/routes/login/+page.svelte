<script lang="ts">
	import { login } from '$lib/api';
	let name = $state('');
	let email = $state('');
	let error = $state(0);
</script>

<h2>Instructions:</h2>
<p>
	After logging in below, you will be taken to our listing of available dogs. You may use the
	options at the top to narrow your search. Simply click on any dog to add them to your favorites.
	Click them again to remove them. Once you have favorited all your dogs, cick the match button, and
	we'll find and present to you your ultimate match!
</p>

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
