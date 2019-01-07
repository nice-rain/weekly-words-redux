import React from 'react';
import {shallow} from 'enzyme';

import Deck from './deck';

describe('<Deck />', () => {

    it('Renders without crashing', () => {
        shallow(<Deck />);
    });
});

