<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { api } from '$lib/constants';
	let dogs = $state([]);
	let next = $state('');
	onMount(async () => {
		try {
			const searchResponse = await fetch(`${api}/dogs/search`, {
				credentials: 'include'
			});
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
		} catch (error) {}
	});
</script>

<style>
</style>
