import React from 'react';
import {shallow} from 'enzyme';

import CardBack from './cardBack';

describe('<CardBack />', () => {
    it('Renders without crashing', () => {
        shallow(<CardBack />);
    });
});
