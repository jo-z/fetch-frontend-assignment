<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { api } from '$lib/constants';
	import DogBox from './dog.svelte';
	import { type Dog } from '$lib/interfaces';
	import Filter from './filter.svelte';
	let dogs: Array<Dog> = $state([]);
	let breeds: Array<string> = $state([]);
	let selectedBreeds = $state([]);
	let next = $state('');

	const search = async () => {
		const searchResponse = await fetch(
			`${api}/dogs/search?${selectedBreeds.length ? selectedBreeds.map((breed) => `breeds=${breed}`).join('&') : ''}`,
			{
				credentials: 'include'
			}
		);
		console.log(searchResponse);
		if (searchResponse.status === 401) goto('/login');
		else {
			const searchResults = await searchResponse.json();
			next = searchResults.next;
			console.log('searchResults: ', searchResults);
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');
			const dogsResponse = await fetch(`${api}/dogs`, {
				method: 'POST',
				body: JSON.stringify(searchResults.resultIds),
				credentials: 'include',
				headers
			});
			dogs = await dogsResponse.json();
		}
	};

	onMount(async () => {
		try {
			search();
			const breedsResponse = await fetch(`${api}/dogs/breeds`, { credentials: 'include' });
			breeds = await breedsResponse.json();
		} catch (error) {}
	});
</script>

<Filter
	{breeds}
	bind:selectedBreeds
	searchOnClick={() => {
		search();
	}}
/>
<div class="dog-container">
	{#each dogs as dogInfo}
		<DogBox {...dogInfo} />
	{/each}
</div>

<style>
	.dog-container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
