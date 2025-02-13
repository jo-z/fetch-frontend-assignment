import { api } from './constants';
import type { Dog, Location, LocationSearchBody } from './interfaces';
import { goto } from '$app/navigation';
const headers = new Headers();
headers.append('Content-Type', 'application/json');

/***
 * Takes an array of zipcode strings and returns an array of Location objects
 * @returns Array<Location>
 */
export const getLocations = async (zipcodes: Array<string>) => {
	const locationResponse = await fetch(`${api}/locations`, {
		credentials: 'include',
		body: JSON.stringify(zipcodes),
		headers,
		method: 'POST'
	});
	if (locationResponse.status === 401) goto('/login');
	const body: Array<Location> = await locationResponse.json();
	return body;
};

export const searchLocations = async (body: LocationSearchBody) => {
	const searchResponse = await fetch(`${api}/locations/search`, {
		credentials: 'include',
		body: JSON.stringify(body),
		headers,
		method: 'POST'
	});
	if (searchResponse.status === 401) goto('/login');
	const results: {
		results: Location[];
		total: number;
	} = await searchResponse.json();
	return results;
};

export const searchDogs = async ({
	breeds,
	sortField,
	sortDirection,
	perPage,
	currentPage,
	zipCodes
}: {
	breeds?: Array<string>;
	sortDirection?: 'asc' | 'desc';
	sortField?: 'breed' | 'age' | 'name';
	perPage: number;
	currentPage: number;
	zipCodes?: Array<string>;
}) => {
	const searchResponse = await fetch(
		`${api}/dogs/search?${breeds?.length ? breeds.map((breed) => `breeds=${breed}`).join('&') : ''}&sort=${sortField}:${sortDirection}&size=${perPage}&from=${(currentPage - 1) * perPage}${zipCodes?.length ? `&${zipCodes.map((zipCode) => `zipCodes=${zipCode}`).join('&')}` : ''}`,
		{
			credentials: 'include'
		}
	);
	if (searchResponse.status === 401) goto('/login');
	const body: { resultIds: Array<string>; total: number; next?: string; prev?: string } =
		await searchResponse.json();
	return body;
};

export const searchDogsWithString = async (searchString: string) => {
	const response = await fetch(`${api}${searchString}`, { credentials: 'include' });
	if (response.status === 401) goto('/login');
	const body: { resultIds: Array<string>; total: number; next?: string; prev?: string } =
		await response.json();
	return body;
};

export const getDogs = async (dogIds: Array<string>) => {
	console.log('hello 1');
	const dogsResponse = await fetch(`${api}/dogs`, {
		method: 'POST',
		body: JSON.stringify(dogIds),
		credentials: 'include',
		headers
	});
	console.log('hello 2');
	if (dogsResponse.status === 401) goto('/login');
	console.log(dogsResponse);
	const body: Array<Dog> = await dogsResponse.json();
	return body;
};

export const getBreeds = async () => {
	const breedsResponse = await fetch(`${api}/dogs/breeds`, { credentials: 'include' });
	const breeds: Array<string> = await breedsResponse.json();
	return breeds;
};

export const login = async ({ name, email }: { name: string; email: string }) => {
	const response = await fetch(`${api}/auth/login`, {
		body: JSON.stringify({ name, email }),
		method: 'POST',
		headers,
		credentials: 'include'
	});
	if (response.status === 200) goto('/');
	else return response.status;
};

export const getMatch = async (dogIds: Array<string>) => {
	const response = await fetch(`${api}/dogs/match`, {
		credentials: 'include',
		method: 'POST',
		body: JSON.stringify(dogIds),
		headers
	});
	if (response.status === 401) goto('/');
	const body: { match: string } = await response.json();
	return body;
};

export const logout = async () => {
	await fetch(`${api}/auth/logout`, {
		credentials: 'include',
		method: 'POST'
	});
	goto('/login');
};
