import React from 'react';
import {shallow} from 'enzyme';

import Loading from './loading';

describe('<Loading />', () => {

    it('Renders without crashing', () => {
        shallow(<Loading />);
    });
});

