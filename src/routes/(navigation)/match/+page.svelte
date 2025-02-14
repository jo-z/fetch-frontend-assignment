<script lang="ts">
	import { type Dog } from '$lib/interfaces';
	import selectedDogs from '$lib/selectedDogs.svelte';
	import { onMount } from 'svelte';
	import DogComponent from '../dog.svelte';
	import { getDogs, getMatch } from '$lib/api';

	let match: Dog | undefined = $state();

	onMount(async () => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const matchId = (await getMatch([...selectedDogs])).match;

		const dog = await getDogs([matchId]);

		match = dog[0];
		if (match) {
			selectedDogs.clear();
			selectedDogs.add(match.id);
		}
	});
</script>

<svelte:head><title>Find your match on Shelter Luv!</title></svelte:head>

{#if match}
	<span>
		<img src={match.img} alt={`picture of ${match.name}`} />
		<p>Congratulations!!!</p>
		<p>
			You matched with {match.name}, the {match.age} year old {match.breed}. Many happy returns!
		</p>
	</span>
{:else if !selectedDogs.size}
	<p>
		No dogs currently favorited. Please find some new favorites on <a href="/">the search page!</a>
	</p>
{:else}
	<p>Please wait for your match</p>
{/if}

<style>
	span {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2rem;
	}
</style>
