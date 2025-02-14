<script lang="ts">
	import { getDogs } from '$lib/api';
	import type { Dog } from '$lib/interfaces';
	import { onMount } from 'svelte';
	import selectedDogs from '$lib/selectedDogs.svelte';
	import DogBox from '../dog.svelte';
	let dogs: Array<Dog> = $state([]);
	onMount(async () => {
		dogs = await getDogs([...selectedDogs]);
	});
</script>

<svelte:head>View your favorites on Shelter Luv!</svelte:head>

{#if dogs.length}
	<span>
		{#each dogs as dogInfo}
			<DogBox {...dogInfo} />
		{/each}
	</span>
{:else if !selectedDogs.size}
	<p>
		No dogs currently favorited. Please find some new favorites on <a href="/">the search page!</a>
	</p>
{:else}
	<p>Loading dogs, please wait!</p>
{/if}

<style>
	span {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
</style>
