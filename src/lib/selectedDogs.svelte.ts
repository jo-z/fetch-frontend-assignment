import { SvelteSet } from 'svelte/reactivity';

const selectedDogs: Set<string> = new SvelteSet();
export default selectedDogs;
