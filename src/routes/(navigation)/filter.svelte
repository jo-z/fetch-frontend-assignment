<script lang="ts">
	import { getContext } from 'svelte';
	import Button from '$lib/Button.svelte';

	let {
		breeds,
		selectedBreeds = $bindable([]),
		sortField = $bindable('breed'),
		sortDirection = $bindable('asc'),
		perPage = $bindable(25),
		distance = $bindable(null),
		searchOnClick
	}: {
		breeds: Array<string>;
		selectedBreeds: Array<string>;
		sortField: 'breed' | 'age' | 'name';
		sortDirection: 'asc' | 'desc';
		perPage: number;
		distance: number | null;
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
			<Button
				onclick={() => {
					showSort = !showSort;
				}}>Sort</Button
			>
			<span id="sort-content-container">
				{#if showSort}
					<span>
						<label for="sort-field">Sort Field:</label>
						<select id="sort-field" bind:value={sortField}>
							<option value="breed">Breed</option>
							<option value="age">Age</option>
							<option value="name">Name</option>
						</select>
					</span>
					<span>
						<label for="sort-direction">Sort Direction:</label>
						<select id="sort-direction" bind:value={sortDirection}>
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
						</select>
					</span>
				{/if}
			</span>
		</span>
		<span id="filter">
			<Button
				onclick={() => {
					showFilter = !showFilter;
				}}>Filter</Button
			>
			<span id="filter-content-container">
				{#if showFilter}
					<span id="breeds-container">
						<label for="breeds">Breeds:</label>
						<select id="breeds" multiple bind:value={selectedBreeds} size="10">
							{#each breeds as breed}
								<option value={breed}>{breed}</option>
							{/each}
						</select>
					</span>
					<label for="distance">Distance:</label><input
						type="number"
						min="0"
						id="distance"
						bind:value={distance}
						size="5"
					/>
					miles from{' '}
					<label for="zipcode">Zip Code:</label>
					<input id="zipcode" type="text" pattern={`[0-9]{5}`} size="5" bind:value={tempZip} />
				{/if}
			</span>
		</span>
		<span id="options-and-search">
			<span>
				<label for="results-per-page">Results Per Page:</label>
				<input type="number" min="1" max="100" id="results-per-page" bind:value={perPage} />
			</span>
			<Button
				style={{ margin: ' 0.5rem' }}
				onclick={() => {
					const formElement = document.getElementsByName(
						'search and filter'
					)[0] as HTMLFormElement | null;
					if (formElement?.checkValidity()) {
						currentZip.code = tempZip;
						console.log('tempZip: ', tempZip);
						searchOnClick();
					}
				}}>Search</Button
			>
		</span>
	</form>
</div>

<style>
	#sort,
	#filter {
		display: flex;
		flex-direction: column;
		margin: 0 0.5rem;
	}
	#filter {
		width: 452px;
	}
	#sort {
		width: 400px;
	}
	#sort-content-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	#sort-content-container span {
		flex-grow: 0;
	}
	#breeds-container {
		display: flex;
		flex-direction: column;
	}
	form {
		font-size: 1.1875rem;
		display: flex;
		justify-content: space-between;
		margin: 0.5rem;
	}
	form > * {
		flex-grow: 1;
	}
	input,
	select {
		border-color: var(--mid);
		padding: 0.125rem 0rem;
		border-style: solid;
		background-color: var(--dark);
		color: var(--light-accent);
		font-size: 1.1875rem;
	}

	@media (width<=1210px) {
		form {
			flex-direction: column;
		}
		#filter {
			width: 100%;
		}
		#sort {
			width: 100%;
		}
		#options-and-search {
			display: flex;
			justify-content: space-between;
		}
	}

	@media (width<=470px) {
		#filter-content-container {
			display: flex;
			flex-direction: column;
		}
		#breeds {
			width: fit-content;
		}
	}

	@media (width<=424px) {
		#sort-content-container {
			display: flex;
			flex-direction: column;
		}
	}
</style>
