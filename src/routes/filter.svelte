<script lang="ts">
	let {
		breeds,
		selectedBreeds = $bindable([]),
		sortField = $bindable('breed'),
		sortDirection = $bindable('asc'),
		perPage = $bindable(25),
		searchOnClick
	}: {
		breeds: Array<string>;
		selectedBreeds: Array<string>;
		sortField: 'breed' | 'age' | 'name';
		sortDirection: 'asc' | 'desc';
		perPage: number;
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
		<label for="sort field">Sort Field:</label>
		<select id="sort field" bind:value={sortField}>
			<option value="breed">Breed</option>
			<option value="age">Age</option>
			<option value="name">Name</option>
		</select>
		<label for="sort direction">Sort Direction:</label>
		<select id="sort direction" bind:value={sortDirection}>
			<option value="asc">Ascending</option>
			<option value="desc">Descending</option>
		</select>
		<label for="results per page">Results Per Page:</label>
		<input type="number" min="1" max="100" id="results per page" bind:value={perPage} />
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
