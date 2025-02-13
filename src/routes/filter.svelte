<script lang="ts">
	import { getContext } from 'svelte';

	let {
		breeds,
		selectedBreeds = $bindable([]),
		sortField = $bindable('breed'),
		sortDirection = $bindable('asc'),
		perPage = $bindable(25),
		distance = $bindable(null),
		matchEnabled = false,
		searchOnClick
	}: {
		breeds: Array<string>;
		selectedBreeds: Array<string>;
		sortField: 'breed' | 'age' | 'name';
		sortDirection: 'asc' | 'desc';
		perPage: number;
		distance: number | null;
		matchEnabled: boolean;
		searchOnClick: () => void;
	} = $props();
	let currentZip: { code?: string } = getContext('currentZip');
	let tempZip = $state('');
	let showSort: boolean = $state(false);
	let showFilter: boolean = $state(false);
</script>

<div>
	<form name="search and filter">
		<span id="sort">
			<button
				onclick={() => {
					showSort = !showSort;
				}}>Sort</button
			>
			<span>
				{#if showSort}
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
				{/if}
			</span>
		</span>
		<span id="filter">
			<button
				onclick={() => {
					showFilter = !showFilter;
				}}>Filter</button
			>
			<span>
				{#if showFilter}
					<label for="breeds">Breeds:</label>
					<select id="breeds" multiple bind:value={selectedBreeds} size="10">
						{#each breeds as breed}
							<option value={breed}>{breed}</option>
						{/each}
					</select>
					<label for="distance">Distance:</label><input
						type="number"
						min="0"
						id="distance"
						bind:value={distance}
						size="5"
					/>
					miles from
					<label for="zipcode">Zip Code:</label>
					<input id="zipcode" type="text" pattern={`[0-9]{5}`} size="5" bind:value={tempZip} />
				{/if}
			</span>
		</span>
		<span id="options-and-search">
			<label for="results per page">Results Per Page:</label>
			<input type="number" min="1" max="100" id="results per page" bind:value={perPage} />
			<button
				onclick={() => {
					const formElement = document.getElementsByName(
						'search and filter'
					)[0] as HTMLFormElement | null;
					if (formElement?.checkValidity()) {
						currentZip.code = tempZip;
						console.log('tempZip: ', tempZip);
						searchOnClick();
					}
				}}>Search</button
			>
			<a href="/match" class={[!matchEnabled && 'disabled']}>Match</a>
		</span>
	</form>
</div>

<style>
	#sort,
	#filter {
		display: flex;
		flex-direction: column;
		flex-basis: 40%;
	}
	form {
		display: flex;
	}
	form > * {
		flex-grow: 1;
	}
	.disabled {
		pointer-events: none;
		text-decoration: line-through;
	}
</style>
