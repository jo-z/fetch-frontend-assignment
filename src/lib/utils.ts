import type { Coordinates } from './interfaces';

/***
 * Finds the distance between to sets of Latitude and Longitude using the Equirectangular approximation
 * @param location first coordinate
 * @param destination second coordinate
 * @returns {number} distance between given coordinates
 */
export const distanceBetweenLatLon = (location: Coordinates, destination: Coordinates) => {
	const earthRadius = 6371;
	const latDeltaRad = (location.lat * Math.PI) / 180 - (destination.lat * Math.PI) / 180;
	const lonDeltaRad =
		((location.lon * Math.PI) / 180 - (destination.lon * Math.PI) / 180) *
		Math.cos(((location.lat * Math.PI) / 180 + (destination.lat * Math.PI) / 180) / 2);
	return earthRadius * Math.hypot(latDeltaRad, lonDeltaRad);
};

/***
 * converts a distance in miles to degrees of latitude
 * @param distance distance in miles
 * @returns {number} distance in degrees of latitude
 */
export const milesToLatDegrees = (distance: number) => {
	return distance / 69.055;
};

/***
 * converts a distance in miles at a given latitude to degrees of longitude
 * @param latitude latitude at which to convert the distance to lognitude
 * @param distance the distance in miles to be converted to degrees of longitude
 * @returns {number} the distance in degrees
 */
export const milesToLonDegrees = (latitude: number, distance: number) => {
	const oneDegree = distanceBetweenLatLon({ lat: latitude, lon: 0 }, { lat: latitude, lon: 1 });
	return distance / oneDegree;
};
