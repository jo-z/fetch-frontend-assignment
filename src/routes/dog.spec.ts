import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Dog from './dog.svelte';

const sampleDog = {
	name: 'Leonard',
	age: 17,
	breed: 'Yorkshire Terrier',
	zip_code: 90210,
	id: '123a4b56',
	img: 'placeholder.jpg'
};

describe('dog component', () => {
	it('renders all fields of the dog interface except for id', () => {
		render(Dog, sampleDog);
		const name = screen.getByText('Name: Leonard');
		expect(name).toBeInTheDocument();
		const image = screen.getByAltText('picture of Leonard');
		expect(image).toBeInTheDocument();
		const age = screen.getByText('Age: 17');
		expect(age).toBeInTheDocument();
		const location = screen.getByText('Zip Code: 90210');
		expect(location).toBeInTheDocument();
		const breed = screen.getByText('Breed: Yorkshire Terrier');
		expect(breed).toBeInTheDocument();
		const id = screen.queryByText(/123a4b56/gi);
		expect(id).not.toBeInTheDocument();
	});
});
