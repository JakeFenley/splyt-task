import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import {capitalize} from 'lodash';
import React from 'react';
import useMapCtx from '../context/MapContext';
import {OfficeKeys} from '../types/map';
import {OFFICES} from '../types/map';

interface Props {}

const LocationSelector: React.FC<Props> = () => {
	const {selectedOfficeKey, setSelectedOffice} = useMapCtx();

	const handleChange = (e: SelectChangeEvent) =>
		setSelectedOffice(e.target.value as OfficeKeys);

	return (
		<FormControl fullWidth>
			<InputLabel>Office Location</InputLabel>
			<Select
				labelId='demo-simple-select-label'
				value={selectedOfficeKey}
				label={capitalize(selectedOfficeKey)}
				onChange={handleChange}
			>
				{Object.keys(OFFICES).map(office => (
					<MenuItem key={office} value={office}>{capitalize(office)}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default LocationSelector;
