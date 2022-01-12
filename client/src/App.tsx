import React from 'react';
import {MapProvider} from './context/MapContext';
import Map from './Map/Map';

const App: React.FC = () => {
	return (
		<main>
			<h1>Splyt Tech Task</h1>
			<MapProvider>
				<Map />
			</MapProvider>
		</main>
	);
};

export default App;
