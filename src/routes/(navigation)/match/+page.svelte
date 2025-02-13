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
		if (match) selectedDogs.clear();
	});
</script>

{#if !selectedDogs.size}
	<p>
		No dogs currently favorited. Please find some new favorites on <a href="/">the search page!</a>
	</p>
{:else if match}
	<DogComponent {...match} />
{:else}
	<p>Please wait for your match</p>
{/if}

<style></style>
