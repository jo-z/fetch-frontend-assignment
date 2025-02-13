export interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
}

export interface Location {
	zip_code: string;
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	county: string;
}
export interface Coordinates {
	lat: number;
	lon: number;
}

export interface LocationSearchBody {
	city?: string;
	states?: string[];
	geoBoundingBox?: {
		top?: Coordinates;
		left?: Coordinates;
		bottom?: Coordinates;
		right?: Coordinates;
		bottom_left?: Coordinates;
		top_left?: Coordinates;
		bottom_right?: Coordinates;
		top_right?: Coordinates;
	};
	size?: number;
	from?: number;
}
