import React from 'react';
import {shallow} from 'enzyme';

import MainContent from './mainContent';

describe('<MainContent />', () => {

    it('Renders without crashing', () => {
        shallow(<MainContent />);
    });
});

