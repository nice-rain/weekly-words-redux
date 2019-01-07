import React from 'react';
import {shallow} from 'enzyme';

import DeckList from './deckList';

describe('<DeckList />', () => {

    it('Renders without crashing', () => {
        shallow(<DeckList />);
    });
});

