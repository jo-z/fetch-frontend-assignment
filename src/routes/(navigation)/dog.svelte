<script lang="ts">
	import { type Dog } from '$lib/interfaces';
	import selectedDogs from '$lib/selectedDogs.svelte';
	import { distanceBetweenLatLon } from '$lib/utils';
	import { getContext } from 'svelte';
	import BottomBorder from '$lib/svgs/BottomBorder.svelte';
	import FavoriteBorder from '$lib/svgs/FavoriteBorder.svelte';
	import { getLocations } from '$lib/api';

	const currentZip: { code?: string } = getContext('currentZip');

	let { age, img, breed, id, zip_code, name }: Dog = $props();
	const calculateDistance = async (zipcode: string | undefined) => {
		if (zipcode) {
			const locationObjectArr = await getLocations([zipcode, zip_code]);
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
	const toggleFavorite = (id: string) => {
		console.log('id: ', id);
		if (selectedDogs.has(id)) selectedDogs.delete(id);
		else selectedDogs.add(id);
		console.log('selectedDogs: ', selectedDogs);
	};
</script>

<button
	class={['dog-box', selectedDogs.has(id) && 'selected']}
	onclick={() => {
		toggleFavorite(id);
	}}
>
	<div class="image-box">
		<span id="blank-placeholder">
			{#if selectedDogs.has(id)}<FavoriteBorder />
			{/if}
		</span>
		<img src={img} alt={`picture of ${name}`} id="dog-photo" />
		<BottomBorder --transform="rotateX(0.5turn)" />
	</div>
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
	<BottomBorder />
</button>

<style>
	p {
		color: var(--dark);
		font-size: 1rem;
		font-family: 'Cabin', sans-serif;
	}
	.dog-box {
		background: none;
		border: none;
		margin: 1rem;
		transition: all 1s ease-out;
	}
	.selected {
		background-color: var(--dark-accent);
		color: var(--light);
		transition: all 1s ease-out;
	}
	.selected p {
		color: var(--light-accent);
		transition: all 1s ease-out;
	}

	.image-box {
		color: var(--dark-accent);
		transition: all 1s ease-out;
	}
	.selected .image-box {
		color: var(--light);
		transition: all 1s ease-out;
	}

	.image-box {
		display: flex;
		flex-direction: column;
	}

	button {
		color: var(--dark-accent);
	}
	#dog-photo {
		width: 350px;
		height: 350px;
		object-fit: contain;
		padding: 0, 15px;
		object-position: 50% 50%;
	}
	#blank-placeholder {
		color: var(--light);
		height: 100px;
	}
</style>
