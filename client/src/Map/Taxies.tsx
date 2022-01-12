import React from 'react';
import Leaflet from 'leaflet';
import taxiImage from '../assets/taxi.png';
import {Marker, Pane} from 'react-leaflet';

interface Props {
	taxies: any[];
}
const taxiMarkerIcon = Leaflet.divIcon({
	html: `<img src=${taxiImage} style="height: 50px; width: 75px;"/>`,
	iconSize: [0, 0],
});

const Taxies: React.FC<Props> = ({taxies}) => {
	return (
		<Pane name='taxies'>
			{taxies.map(taxi => {
				const {location, driver_id} = taxi;
				const {latitude, longitude} = location;

				return (
					<Marker
						key={driver_id}
						interactive={false}
						position={{lat: latitude, lng: longitude}}
						icon={taxiMarkerIcon}
					/>
				);
			})}
		</Pane>
	);
};

export default Taxies;
