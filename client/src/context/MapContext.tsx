// I didn't really need a context here, but I think if it were a real app being built for production
// then context API/Redux reducer would have been the right choice.

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import useGeolocation from 'react-hook-geolocation';
import haversineDistance from 'haversine-distance';
import {selectedOfficeLatLng, OfficeKeys, OFFICE_LOCATIONS} from '../types/map';

export interface MapContextType {
	selectedOfficeLatLng: selectedOfficeLatLng | undefined;
	setSelectedOffice: (key: OfficeKeys) => void;
	selectedOfficeKey: OfficeKeys | undefined;
}

const MapContext = createContext<MapContextType>({} as MapContextType);

export const MapProvider: React.FC = ({children}) => {
	const [loading, setLoading] = useState(true);
	const [selectedOfficeKey, setSelectedOfficeKey] = useState<OfficeKeys>();
	const [selectedOfficeLatLng, setSelectedOfficeLatLng] =
		useState<selectedOfficeLatLng | undefined>();

	const userGeolocation = useGeolocation();

	const setSelectedOffice = useCallback((key: OfficeKeys) => {
		setSelectedOfficeKey(key);
		setSelectedOfficeLatLng(OFFICE_LOCATIONS[key]);
	}, []);

	useEffect(() => {
		if (!loading) {
			return;
		}

		if (userGeolocation.error) {
			// TODO: Trigger error warning here
			return setSelectedOfficeLatLng(OFFICE_LOCATIONS.LONDON);
		}

		let closestLocationKey!: OfficeKeys;
		let minDistance = Number.MAX_SAFE_INTEGER;
		const OfficeKeys = Object.keys(OFFICE_LOCATIONS) as OfficeKeys[];

		for (const key of OfficeKeys) {
			if (!closestLocationKey) {
				closestLocationKey = key;
				minDistance = haversineDistance(userGeolocation, OFFICE_LOCATIONS[key]);
				continue;
			}

			const curr = haversineDistance(userGeolocation, OFFICE_LOCATIONS[key]);

			if (curr < minDistance) {
				closestLocationKey = key;
				minDistance = curr;
			}
		}

		setLoading(false);
		setSelectedOffice(closestLocationKey);
	}, [userGeolocation, loading, setSelectedOffice]);

	const value = useMemo(
		() => ({
			selectedOfficeLatLng,
			selectedOfficeKey,
			setSelectedOffice,
		}),
		[selectedOfficeLatLng, setSelectedOffice, selectedOfficeKey]
	);
	return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export default function useMapCtx() {
	return useContext(MapContext);
}
