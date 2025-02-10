import { describe, expect, it } from 'vitest';
import Filter from './filter.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

describe('filter component', () => {
	it('should allow selecting from a provided list of breeds', () => {
		render(Filter, {
			breeds: sampleBreedList,
			selectedBreeds: [],
			searchOnClick: () => {},
			sortDirection: 'asc',
			sortField: 'breed',
			perPage: 25
		});
		sampleBreedList.forEach((breed) => {
			const breedEntry = screen.getByText(breed);
			expect(breedEntry).toBeInTheDocument();
		});
	});
	it('should have options to sort by ascending or descending values', async () => {
		const user = userEvent.setup();
		render(Filter, {
			breeds: sampleBreedList,
			selectedBreeds: [],
			searchOnClick: () => {},
			sortDirection: 'asc',
			sortField: 'breed',
			perPage: 25
		});
		expect(screen.getByText('Ascending')).toBeVisible();
		await user.click(screen.getByLabelText('Sort Direction:'));
		expect(screen.getByText('Descending')).toBeInTheDocument();
	});
	it('should have options to sort by breed, name, and age', async () => {
		const user = userEvent.setup();
		render(Filter, {
			breeds: sampleBreedList,
			selectedBreeds: [],
			searchOnClick: () => {},
			sortDirection: 'asc',
			sortField: 'breed',
			perPage: 25
		});
		expect(screen.getByText('Breed')).toBeInTheDocument();
		await user.click(screen.getByLabelText('Sort Field:'));
		expect(screen.getByText('Name')).toBeInTheDocument();
		expect(screen.getByText('Age')).toBeInTheDocument();
	});

	it('per page option should default to passed perPage value', () => {
		render(Filter, {
			breeds: sampleBreedList,
			selectedBreeds: [],
			searchOnClick: () => {},
			sortDirection: 'asc',
			sortField: 'breed',
			perPage: 30
		});
		const input: HTMLInputElement = screen.getByLabelText('Results Per Page:');
		expect(input.value).toBe('30');
	});
});
const sampleBreedList = [
	'Affenpinscher',
	'Afghan Hound',
	'African Hunting Dog',
	'Airedale',
	'American Staffordshire Terrier',
	'Appenzeller',
	'Australian Terrier',
	'Basenji',
	'Basset',
	'Beagle',
	'Bedlington Terrier',
	'Bernese Mountain Dog',
	'Black-and-tan Coonhound',
	'Blenheim Spaniel',
	'Bloodhound',
	'Bluetick',
	'Border Collie',
	'Border Terrier',
	'Borzoi',
	'Boston Bull',
	'Bouvier Des Flandres',
	'Boxer',
	'Brabancon Griffon',
	'Briard',
	'Brittany Spaniel',
	'Bull Mastiff',
	'Cairn',
	'Cardigan',
	'Chesapeake Bay Retriever',
	'Chihuahua',
	'Chow',
	'Clumber',
	'Cocker Spaniel',
	'Collie',
	'Curly-coated Retriever',
	'Dandie Dinmont',
	'Dhole',
	'Dingo',
	'Doberman',
	'English Foxhound',
	'English Setter',
	'English Springer',
	'EntleBucher',
	'Eskimo Dog',
	'Flat-coated Retriever',
	'French Bulldog',
	'German Shepherd',
	'German Short-haired Pointer',
	'Giant Schnauzer',
	'Golden Retriever',
	'Gordon Setter',
	'Great Dane',
	'Great Pyrenees',
	'Greater Swiss Mountain Dog',
	'Groenendael',
	'Ibizan Hound',
	'Irish Setter',
	'Irish Terrier',
	'Irish Water Spaniel',
	'Irish Wolfhound',
	'Italian Greyhound',
	'Japanese Spaniel',
	'Keeshond',
	'Kelpie',
	'Kerry Blue Terrier',
	'Komondor',
	'Kuvasz',
	'Labrador Retriever',
	'Lakeland Terrier',
	'Leonberg',
	'Lhasa',
	'Malamute',
	'Malinois',
	'Maltese Dog',
	'Mexican Hairless',
	'Miniature Pinscher',
	'Miniature Poodle',
	'Miniature Schnauzer',
	'Newfoundland',
	'Norfolk Terrier',
	'Norwegian Elkhound',
	'Norwich Terrier',
	'Old English Sheepdog',
	'Otterhound',
	'Papillon',
	'Pekinese',
	'Pembroke',
	'Pomeranian',
	'Pug',
	'Redbone',
	'Rhodesian Ridgeback',
	'Rottweiler',
	'Saint Bernard',
	'Saluki',
	'Samoyed',
	'Schipperke',
	'Scotch Terrier',
	'Scottish Deerhound',
	'Sealyham Terrier',
	'Shetland Sheepdog',
	'Shih-Tzu',
	'Siberian Husky',
	'Silky Terrier',
	'Soft-coated Wheaten Terrier',
	'Staffordshire Bullterrier',
	'Standard Poodle',
	'Standard Schnauzer',
	'Sussex Spaniel',
	'Tibetan Mastiff',
	'Tibetan Terrier',
	'Toy Poodle',
	'Toy Terrier',
	'Vizsla',
	'Walker Hound',
	'Weimaraner',
	'Welsh Springer Spaniel',
	'West Highland White Terrier',
	'Whippet',
	'Wire-haired Fox Terrier',
	'Yorkshire Terrier'
];
