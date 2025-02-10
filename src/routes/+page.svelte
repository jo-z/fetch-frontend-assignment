<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { api } from '$lib/constants';
	import DogBox from './dog.svelte';
	import { type Dog } from '$lib/interfaces';
	import Filter from './filter.svelte';
	import selectedDogs from '$lib/selectedDogs.svelte';

	let dogs: Array<Dog> = $state([]);
	let breeds: Array<string> = $state([]);
	let selectedBreeds = $state([]);
	let sortField: 'breed' | 'name' | 'age' = $state('breed');
	let sortDirection: 'asc' | 'desc' = $state('asc');
	let next = $state('');
	let prev = $state('');
	let totalDogs = $state(0);
	let perPage = $state(25);
	let currentPage = $state(1);

	const toggleFavorite = (id: string) => {
		console.log('id: ', id);
		if (selectedDogs.has(id)) selectedDogs.delete(id);
		else selectedDogs.add(id);
		console.log('selectedDogs: ', selectedDogs);
	};

	const search = async (searchString?: string) => {
		const searchResponse = searchString
			? await fetch(`${api}${searchString}`, { credentials: 'include' })
			: await fetch(
					`${api}/dogs/search?${selectedBreeds.length ? selectedBreeds.map((breed) => `breeds=${breed}`).join('&') : ''}&sort=${sortField}:${sortDirection}&size=${perPage}&from=${(currentPage - 1) * perPage}`,
					{
						credentials: 'include'
					}
				);
		console.log(searchResponse);
		if (searchResponse.status === 401) goto('/login');
		else {
			const searchResults = await searchResponse.json();
			next = searchResults.next;
			prev = searchResults.prev;
			totalDogs = searchResults.total;
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

<div>
	<Filter
		{breeds}
		bind:selectedBreeds
		bind:sortDirection
		bind:sortField
		bind:perPage
		searchOnClick={() => {
			search();
		}}
	/>
	<a href="/match" class={[!selectedDogs.size && 'disabled']}>Match</a>
</div>
<div class="dog-container">
	{#each dogs as dogInfo}
		<DogBox
			{...dogInfo}
			toggleFavorite={() => {
				toggleFavorite(dogInfo.id);
			}}
		/>
	{/each}
</div>
{#if prev?.length && currentPage > 1}
	<button
		onclick={() => {
			currentPage--;
			search(prev);
		}}>Previous</button
	>
{/if}
{#if next?.length && totalDogs > perPage * currentPage}
	<button
		onclick={() => {
			currentPage++;
			search(next);
		}}>Next</button
	>
{/if}

<style>
	.dog-container {
		display: flex;
		flex-wrap: wrap;
	}
	.disabled {
		pointer-events: none;
		text-decoration: line-through;
	}
</style>
