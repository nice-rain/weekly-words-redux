import React from 'react';
import {shallow} from 'enzyme';

import CardFront from './cardFront';

describe('<CardFront />', () => {

    it('Renders without crashing', () => {
        shallow(<CardFront />);
    });
});

