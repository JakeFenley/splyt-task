import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Map from '../Map/Map';

const setup = () => render(<Map />);

// jest and babel aren't playing nice so i can't test unless i spend a significant amount of time debugging it.
// I mainly wanted to write tests to ensure the user geolocation pointed to the right place
// so thats the main thing I would have tried to do here.

describe('<Map />', () => {
	describe('when page is initialized', () => {
	});
});
