<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let dogs = $state([]);
	onMount(async () => {
		try {
			const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
				credentials: 'include'
			});
			console.log(response);
			if (response.status === 401) goto('/login');
		} catch (error) {}
	});
</script>

<style>
</style>
