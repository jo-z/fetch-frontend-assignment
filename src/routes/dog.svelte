<script lang="ts">
	import { type DogProps } from '$lib/interfaces';
	import selectedDogs from '$lib/selectedDogs.svelte';

	let { age, img, breed, id, zip_code, name, toggleFavorite }: DogProps = $props();
</script>

<button class={['dog-box', selectedDogs.has(id) && 'selected']} onclick={toggleFavorite}>
	<img src={img} alt={`picture of ${name}`} />
	<div class="info-box">
		<p>Name: {name}</p>
		<p>Age: {age}</p>
		<p>Breed: {breed}</p>
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
