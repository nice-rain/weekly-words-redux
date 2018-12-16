import * as actions from '../actions';

//Initial test state (deck data is simulated for now)
const initialState = {
    decks: [
    {
        deckName: 'Week 1',
        deckReviewTotal: 55,
        deckHighestAccuracy: 8,
        deckAverageAccuracy: 5,
        deckFastestTime: 60,
        deckAverageTime: 100,
        displayInfo:false,
        cards: []
    }, 
        
    {
        deckName: 'Week 2',
        deckReviewTotal: 9,
        deckHighestAccuracy: 82,
        deckAverageAccuracy: 54,
        deckFastestTime: 605,
        deckAverageTime: 1002,
        displayInfo: false,
        cards: []
    }, 

    {
        deckName: 'Week 3',
        deckReviewTotal: 60,
        deckHighestAccuracy: 67,
        deckAverageAccuracy: 32,
        deckFastestTime: 403,
        deckAverageTime: 2005,
        displayInfo: false,
        cards: []
    }],
    title: 'Weekly Words',
    navText:'logout',
    showNav: true,
    page: 'decks',
    review: {
        deckIndex: '0',
        shuffledCardIndices: [3,4,5,6,1],
        startTime: 0,
        cardCounter: 0
    }
};

export const weeklyWordsReducer = (state = initialState, action) =>{

    if(action.type === actions.SHOW_HIDE_DECK_INFO)
    {
        console.log('action = ShowHideDeck');

        //Map our deck array, if the index matches, modify it
        const decks = state.decks.map((deck, index) =>{
            if(index === action.index)
            {
                deck.displayInfo = !deck.displayInfo;
            }
            return deck;
        });
        return Object.assign({}, state, {decks}); 
    }

    else if(action.type === actions.START_REVIEW)
    {
        console.log('action = startReview');
    }

    //Default
    return state;
}

