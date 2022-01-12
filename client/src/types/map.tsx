export const OFFICES = {
	LONDON: 'LONDON',
	SINGAPORE: 'SINGAPORE',
} as const;

export const OFFICE_LOCATIONS = {
	[OFFICES.LONDON]: {lat: 51.5049375, lng: -0.0964509},
	[OFFICES.SINGAPORE]: {lat: 1.285194, lng: 103.8522982},
} as const;

export type OfficeKeys = keyof typeof OFFICE_LOCATIONS;
export type selectedOfficeLatLng = typeof OFFICE_LOCATIONS[OfficeKeys];