import {Slider} from '@mui/material';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import css from './Map.module.css';
import useMapCtx from '../context/MapContext';
import LocationSelector from './LocationSelector';
import {debounce} from 'lodash';
import axios, {AxiosRequestConfig} from 'axios';
import Taxies from './Taxies';
import PanController from './PanController';
import {selectedOfficeLatLng} from '../types/map';

const API_ENDPOINT = 'http://localhost:8080/taxies';

const Map: React.FC = () => {
	const {selectedOfficeLatLng} = useMapCtx();
	const [loading, setLoading] = useState(true);
	const [numberOfTaxies, setNumberOfTaxies] = useState<number>(5);
	const [taxies, setTaxies] = useState([]);

	const fetchTaxies = useMemo(
		() =>
			debounce(params => {
				const opts: AxiosRequestConfig = {params};

				axios
					.get(API_ENDPOINT, opts)
					.then(res => setTaxies(res.data.drivers))
					.catch(err => console.log(err));
			}, 1000),
		[]
	);

	const taxiRefresh = useCallback(() => {
		const {lat, lng} = selectedOfficeLatLng as selectedOfficeLatLng;

		const params = {latitude: lat, longitude: lng, count: numberOfTaxies};

		fetchTaxies(params);
	}, [numberOfTaxies, selectedOfficeLatLng, fetchTaxies]);

	const handleSliderChange = (e: Event) => {
		const {value} = e.target as HTMLInputElement;
		setNumberOfTaxies(parseInt(value, 10));
	};

	useEffect(() => {
		if (!selectedOfficeLatLng && loading) {
			return;
		}

		if (selectedOfficeLatLng && loading) {
			setLoading(false);
			return;
		}

		taxiRefresh();
		const interval = setInterval(taxiRefresh, 10000);

		return () => clearInterval(interval);
	}, [selectedOfficeLatLng, loading, numberOfTaxies, taxiRefresh]);

	if (!selectedOfficeLatLng) {
		return null;
	}

	return (
		<div className={css.mainContainer}>
			<div className={css.mapContainer}>
				<MapContainer
					center={selectedOfficeLatLng}
					zoom={14}
					scrollWheelZoom={true}
					style={{height: '100%', width: '100%'}}
				>
					<TileLayer
						url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
					/>
					<Marker position={selectedOfficeLatLng} />
					<Taxies taxies={taxies} />
					<PanController selectedOfficeLatLng={selectedOfficeLatLng} />
				</MapContainer>
			</div>

			<div className={css.controls}>
				<Slider
					aria-label='Taxies'
					valueLabelDisplay='auto'
					step={1}
					value={numberOfTaxies}
					marks
					min={1}
					max={10}
					onChange={handleSliderChange}
				/>
				<LocationSelector />
			</div>
		</div>
	);
};

export default Map;
