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

{#if dogs.length}
	{#each dogs as dogInfo}
		<DogBox {...dogInfo} />
	{/each}
{:else}
	<p>
		No dogs currently favorited. Please find some new favorites on <a href="/">the search page!</a>
	</p>
{/if}
