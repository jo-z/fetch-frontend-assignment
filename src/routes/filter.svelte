<script lang="ts">
	let {
		breeds,
		selectedBreeds = $bindable([]),
		searchOnClick
	}: {
		breeds: Array<string>;
		selectedBreeds: Array<string>;
		searchOnClick: () => void;
	} = $props();
</script>

<div>
	<form name="search and filter">
		<label for="breeds">Breeds:</label>
		<select id="breeds" multiple bind:value={selectedBreeds} size="10">
			{#each breeds as breed}
				<option value={breed}>{breed}</option>
			{/each}
		</select>
		<button
			onclick={() => {
				searchOnClick();
				console.log('component selected breeds: ', $state.snapshot(selectedBreeds));
			}}>Search</button
		>
	</form>
</div>

<style>
</style>
