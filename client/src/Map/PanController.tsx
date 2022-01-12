// if i were to refactor I'd ditch this component altogether and maybe execute the panning logic
// from the LocationSelector component I made.

// But I'd weigh the pros and cons there as giving too many map children control
// over map controls could possibly get buggy and messy over time.

// Ideally I'd like actions like this to be the responsibility of the Map component,
// but I found it difficult at the time to get a ref to the MapContainer inside the parent component.


import React, {useEffect} from 'react';
import {useMap} from 'react-leaflet';
import {selectedOfficeLatLng} from '../types/map';

interface Props {
	selectedOfficeLatLng: selectedOfficeLatLng;
}

const PanController: React.FC<Props> = ({selectedOfficeLatLng}) => {
	const map = useMap();

	useEffect(() => {
		map.panTo(selectedOfficeLatLng);
	}, [selectedOfficeLatLng, map]);

	return null;
};

export default PanController;
