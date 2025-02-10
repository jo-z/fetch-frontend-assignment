<script lang="ts">
	import { type Dog } from '$lib/interfaces';
	import selectedDogs from '$lib/selectedDogs.svelte';
	import { onMount } from 'svelte';
	import { api } from '$lib/constants';
	import DogComponent from '../dog.svelte';
	import { goto } from '$app/navigation';

	let match: Dog | undefined = $state();

	onMount(async () => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const matchResponse = await fetch(`${api}/dogs/match`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify([...selectedDogs]),
			headers
		});
		if (matchResponse.status === 401) goto('/login');
		const matchId = (await matchResponse.json()).match;
		console.log('matchId: ', matchId);
		const dogResponse = await fetch(`${api}/dogs`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify([matchId]),
			headers
		});
		const dog = await dogResponse.json();
		console.log(dog);
		match = dog[0];
		if (match) selectedDogs.clear();
	});
</script>

{#if match}
	<DogComponent {...match} />
{:else}
	<p>Please wait for your match</p>
{/if}

<style></style>
