<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import DogBox from './dog.svelte';
	import Button from '$lib/Button.svelte';
	import { type Dog, type Location } from '$lib/interfaces';
	import Filter from './filter.svelte';
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
	let loadedData = $state(false);

	let currentZip: { code?: string } = $state({});
	setContext('currentZip', currentZip);

	const search = async (searchString?: string) => {
		let locations: Array<Location> = [];
		if (!searchString && currentZip?.code && distance) {
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');
			const locationObject = (await getLocations([currentZip.code]))[0];
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

		loadedData = false;
		dogs = [];
		let searchResults;
		if (searchString) {
			searchResults = await searchDogsWithString(searchString);
		} else {
			currentPage = 1;
			searchResults = await searchDogs({
				breeds: selectedBreeds,
				perPage,
				currentPage,
				sortDirection,
				sortField,
				zipCodes: locations.map((location) => location.zip_code)
			});
		}
		next = searchResults?.next || '';
		prev = searchResults?.prev || '';
		totalDogs = searchResults.total;

		dogs = await getDogs(searchResults.resultIds);
		loadedData = true;
	};

	onMount(async () => {
		try {
			search();
			breeds = await getBreeds();
		} catch (error) {}
	});
</script>

<svelte:head><title>Search our dogs on Shelter Luv!</title></svelte:head>

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
		{#each dogs as dogInfo (dogInfo.id)}
			<DogBox {...dogInfo} />
		{/each}
	</div>
	<div id="page-button-container">
		<Button
			onclick={prev?.length && currentPage > 1
				? () => {
						currentPage--;
						search(prev);
					}
				: () => {}}
			disabled={!(prev?.length && currentPage > 1)}>Previous</Button
		>
		<p>Page {currentPage}</p>
		<Button
			id="next-button"
			onclick={next?.length && totalDogs > perPage * currentPage
				? () => {
						currentPage++;
						search(next);
					}
				: () => {}}
			disabled={!(next?.length && totalDogs > perPage * currentPage)}>Next</Button
		>
	</div>
{:else if loadedData}
	<p>No dogs found. Please try again with more generous search criteria</p>
{:else}
	<p id="loading">Currently loading Dogs. Please be patient</p>
{/if}

<style>
	#page-button-container {
		display: flex;
		justify-content: space-between;
	}
	.dog-container {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	#loading {
		text-align: center;
	}
</style>
