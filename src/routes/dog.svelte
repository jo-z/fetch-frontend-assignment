<script lang="ts">
	import { api } from '$lib/constants';
	import { type DogProps, type Location, type Coordinates } from '$lib/interfaces';
	import selectedDogs from '$lib/selectedDogs.svelte';
	import { distanceBetweenLatLon } from '$lib/utils';
	import { getContext, onMount } from 'svelte';

	const currentZip: { code?: string } = getContext('currentZip');

	let { age, img, breed, id, zip_code, name, toggleFavorite }: DogProps = $props();
	const calculateDistance = async (zipcode: string | undefined) => {
		console.log('zipcode: ', zipcode);
		if (zipcode) {
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');
			const locationResponse = await fetch(`${api}/locations`, {
				credentials: 'include',
				body: JSON.stringify([zipcode, zip_code]),
				headers,
				method: 'POST'
			});
			const locationObjectArr: Array<Location> = await locationResponse.json();
			return Math.round(
				distanceBetweenLatLon(
					{ lat: locationObjectArr[0].latitude, lon: locationObjectArr[0].longitude },
					{ lat: locationObjectArr[1].latitude, lon: locationObjectArr[1].longitude }
				)
			);
		}
		return null;
	};
	let distance: Promise<number | null> = $derived(calculateDistance(currentZip?.code));
</script>

<button class={['dog-box', selectedDogs.has(id) && 'selected']} onclick={toggleFavorite}>
	<img src={img} alt={`picture of ${name}`} />
	<div class="info-box">
		<p>Name: {name}</p>
		<p>Age: {age}</p>
		<p>Breed: {breed}</p>
		{#await distance then resolvedDistance}
			{#if resolvedDistance || resolvedDistance === 0}
				<p>Distance: {resolvedDistance} Miles</p>
			{/if}
		{/await}
		<p>Zip Code: {zip_code}</p>
	</div>
</button>

<style>
	.dog-box {
		border: 1px solid black;
		margin: 1rem;
	}
	.selected {
		background-color: aquamarine;
	}
	img {
		width: 400px;
		height: 400px;
		object-fit: contain;
		padding: 10px;
		object-position: 50% 50%;
	}
</style>
