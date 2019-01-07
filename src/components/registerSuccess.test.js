import React from 'react';
import {shallow} from 'enzyme';

import RegisterSuccess from './registerSuccess';

describe('<RegisterSuccess />', () => {

    it('Renders without crashing', () => {
        shallow(<RegisterSuccess />);
    });
});

