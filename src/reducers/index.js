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
        cards: [{
            word:'example',
            results: [
            {
                partOfSpeech: 'noun',
                definition: 'a thing characteristic of its kind or illustrating a general rule.',
                usage: `it's a good example of how European action can produce results`
            },
            {
                partOfSpeech: 'noun',
                definition: 'a representative form or pattern',
                usage: `I profited from his example`
            }]
        },
        {
            word:'test',
            results: [
            {
                partOfSpeech: 'noun',
                definition: 'trying something to find out about it.',
                usage: ``
            },
            {
                partOfSpeech: 'verb',
                definition: `examine someone's knowledge of something`,
                usage: `The teacher tests us every week`
            }]
        },
        {
            word:'metrology',
            results: [
            {
                partOfSpeech: 'noun',
                definition: 'the scientific study of measurement',
                usage: ``
            }]
        },
        {
            word:'epitome',
            results: [
            {
                partOfSpeech: 'noun',
                definition: 'a standard or typical example',
                usage: ``
            },
            {
                partOfSpeech: 'noun',
                definition: `a brief abstract (as of an article or book)`,
                usage: ``
            }]
        },
        {
            word:'slumgullion',
            results: [
            {
                partOfSpeech: 'noun',
                definition: 'a thin stew of meat and vegetables',
                usage: ``
            }]
        }]
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
    title: 'Decks',
    navText:'logout',
    showNav: true,
    page: 'decks',
    review: {
        deckIndex: 0, //Index of deck being reviewed
        shuffledCardIndices: [3,4,1,2,0],
        startTime: 0, //Time we began review
        cardCounter: 0, //Total number of times we've clicked flip
        currentCard: 0 //Index of current card within deck
    }
};

/**
 * Returns a random number within the given range
 * @param {number} min Minimum number in range
 * @param {number} max Maximum number in range
 */
function randRange(min, max)
{
    //console.log(`Minimum is: ${min}`);
    console.log(`Maximum is ${max}`)

    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Function randomizes the indices within our deck for review
 * @param {state} state State passed from reducer (immutable)
 * @param {Number} deckIndex Index of deck that we are reviewing.
 * @return {Array} returns array of indices to review.
 */
function shuffleDeck(state, deckIndex)
{
    const numCards = state.decks[deckIndex].cards.length;

    //Store all empty keys in our shuffledCard array
    const tempIndices = [...Array(numCards).keys()];
    
    //Array containing shuffled card indices
    const shuffledIndices = [];

    //Log our temporary indices (before shuffling)
    console.log(tempIndices);

    //loop through each card index
    for (let i = 0; i < numCards; i++)
    {
        //get a random number from 0 to our final index
        let randomIndex = randRange(0, tempIndices.length);
        // console.log(`Index in temporary array is ${randomIndex}`);
        // console.log(`This gives us a shuffled index value of ${tempIndices[randomIndex]}`)

        //Add it to our shuffled indices
        shuffledIndices[tempIndices[randomIndex]] = i;

        //Remove the random index from the tempIndices array (and resize it)
        tempIndices.splice(randomIndex, 1);

        //log after splice
        console.log(tempIndices);
    }

    //Log our shuffled indices
    console.log(shuffledIndices);

    //Return our shuffled indices to our reducer
    return shuffledIndices;
}

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
        return Object.assign({}, state, {
            page:'cardFront',
            title:'Front',
            navText:'End',
            review:{
                shuffledCardIndices: shuffleDeck(state, action.index),
                startTime: Date.now(),
                deckIndex: action.index,
                cardCounter:0,
                currentCard:0
            }
        });
    }

    else if(action.type === actions.FLIP_CARD)
    {
        console.log('action = flipCard');
        return Object.assign({}, state, {
            page: 'cardBack',
            title:'Back',
            navText:'End'
        });
    }

    //Default
    return state;
}

