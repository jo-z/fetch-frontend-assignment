<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import DogBox from './dog.svelte';
	import { type Dog, type Location } from '$lib/interfaces';
	import Filter from './filter.svelte';
	import selectedDogs from '$lib/selectedDogs.svelte';
	import { milesToLatDegrees, milesToLonDegrees } from '$lib/utils';
	import {
		getBreeds,
		getDogs,
		getLocations,
		searchDogs,
		searchDogsWithString,
		searchLocations
	} from '$lib/api';

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
	let distance: number | null = $state(null);
	let initialData = $state(false);

	let currentZip: { code?: string } = $state({});
	setContext('currentZip', currentZip);

	const search = async (searchString?: string) => {
		let locations: Array<Location> = [];
		if (!searchString && currentZip?.code && distance) {
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');
			const locationObject: Location = (await getLocations([currentZip.code]))[0];
			const coordinates = {
				lat: locationObject.latitude,
				lon: locationObject.longitude
			};
			const yDistance = milesToLatDegrees(distance / 2);
			const xDistance = milesToLonDegrees(coordinates.lat, distance / 2);
			locations = (
				await searchLocations({
					geoBoundingBox: {
						top_left: { lat: coordinates.lat + yDistance, lon: coordinates.lon - xDistance },
						bottom_right: { lat: coordinates.lat - yDistance, lon: coordinates.lon + xDistance }
					},
					size: 10000
				})
			).results;
		}
		console.log('locations: ', locations);
		const searchResults = searchString
			? await searchDogsWithString(searchString)
			: await searchDogs({
					breeds: selectedBreeds,
					perPage,
					currentPage,
					sortDirection,
					sortField,
					zipCodes: locations.map((location) => location.zip_code)
				});

		next = searchResults?.next || '';
		prev = searchResults?.prev || '';
		totalDogs = searchResults.total;
		console.log('searchResults: ', searchResults);
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		dogs = await getDogs(searchResults.resultIds);
	};

	onMount(async () => {
		try {
			search();
			breeds = await getBreeds();
			initialData = true;
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
		bind:distance
		searchOnClick={() => {
			search();
		}}
	/>
</div>
{#if dogs.length}
	<div class="dog-container">
		{#each dogs as dogInfo}
			<DogBox {...dogInfo} />
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
{:else if initialData}
	<p>No dogs found. Please try again with more generous search criteria</p>
{:else}
	<p>Currently loading Dogs. Please be patient</p>
{/if}

<style>
	.dog-container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
