import React from 'react';
import {shallow} from 'enzyme';

import WeeklyWords from './weeklyWords';

describe('<WeeklyWords />', () => {

    it('Renders without crashing', () => {
        shallow(<WeeklyWords />);
    });
});

