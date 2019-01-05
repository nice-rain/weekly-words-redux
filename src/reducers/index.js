import * as actions from '../actions';

//Initial test state (deck data is simulated for now)
const initialState = {
    decks: [],
    title: 'Weekly Words',
    navText:'logout',
    loginError: null,
    deckError:false, //This error occurs when our GET fails
    registerError:null,
    showNav: false,
    loading:false,
    reviewError: false, //this error occurs when our PUT fails
    showHelp:true,
    page: 'login',
    review: {
        deckIndex: 0, //Index of deck being reviewed
        shuffledCardIndices: [3,4,1,2,0],
        startTime: 0, //Time we began review
        cardCounter: 0, //Total number of times we've clicked flip
        currentCard: 0, //Index of current card within deck
        endTime:0
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
    const numCards = state.decks[deckIndex].generatedDeck.cards.length;

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
            showNav:true,
            review:{
                shuffledCardIndices: shuffleDeck(state, action.index),
                startTime: Date.now(),
                deckIndex: action.index,
                cardCounter:0,
                currentCard:0,
                endTime:0
            }
        });
    }

    else if(action.type === actions.FLIP_CARD)
    {
        console.log('action = flipCard');
        return Object.assign({}, state, {
            page: 'cardBack',
            title:'Back',
            navText:'End',
            showNav:true
        });
    }

    else if(action.type === actions.RIGHT_ANSWER)
    {
        console.log('action = rightAnswer');
        
        //We will need to start by removing our current index from the shuffledIndices array
        const shuffledCards = [...state.review.shuffledCardIndices.slice(0, state.review.currentCard),
            ...state.review.shuffledCardIndices.slice(state.review.currentCard + 1)];

        const nextPage = {};

        //Determine if we keep or change the index 
        //(should restart from front card once we miss a few)
        let newCardIndex = state.review.currentCard;
        if(newCardIndex >= shuffledCards.length)
        {
            newCardIndex = 0;
        }

        //Now we need to determine if we flip to the front or if we show results
        //If we have no cards left, show results
        if(shuffledCards.length <= 0)
        {
            nextPage.page = 'results';
            nextPage.title = 'Results';
            nextPage.navText = 'Done';
            nextPage.showNav = false;
        }
        else{
            nextPage.page = 'cardFront';
            nextPage.title = 'Front';
            nextPage.navText = 'End';
            nextPage.showNav = true;
        }

        //We need to refactor this to ONLY update what's needed
        //We should not be forced to udpate the entire review object.
        return Object.assign({}, state,{
            page: nextPage.page,
            title: nextPage.title,
            navText: nextPage.navText,
            showNav:nextPage.showNav,
            review: {...state.review, 
                cardCounter: state.review.cardCounter + 1, 
                currentCard: newCardIndex, 
                shuffledCardIndices: shuffledCards,
                endTime: Date.now()
            }
        });
    }

    else if (action.type === actions.WRONG_ANSWER)
    {
        console.log('action = wrongAnswer');
        
        //Move our index 1
        let newCardIndex = state.review.currentCard + 1;
        if(newCardIndex >= state.review.shuffledCardIndices.length)
        {
            //If we go out of bounds, set our index back to 0
            newCardIndex = 0;
        }

        const nextPage = {
            page: 'cardFront',
            title: 'Front',
            navText: 'End',
            showNav: true
        };

        return Object.assign({}, state, {
            page: nextPage.page,
            title: nextPage.title,
            navText: nextPage.navText,
            review: {...state.review, 
                cardCounter: state.review.cardCounter + 1, 
                currentCard: newCardIndex, 
            }
        });
    }

    //Bring us to our decks page if we return home or login
    else if (action.type === actions.RETURN_HOME || action.type === actions.LOGIN_SUCCESS)
    {
        console.log('action = returnHome');
        return Object.assign({}, state, {
            page: 'decks',
            title:'Decks',
            navText: 'logout',
            showNav: true,
            loading:false
        });
    }

    else if(action.type === actions.LOGIN_REQUEST)
    {
        console.log('action = loginRequest');
        return Object.assign({}, state, {
            decks:null,
            loading:true,
            loginError:null
        });
    }

    else if(action.type === actions.LOGIN_ERROR)
    {
        let errorStatus;
        if(action.err.status === 401)
        {
            errorStatus = "The username or password is incorrect.";
        }
        else{
            errorStatus = "Something went wrong. Please try again.";
        }


        console.log('action = loginError');
        return Object.assign({}, state, {
            loading:false,
            loginError: errorStatus
        });
    }

    else if (action.type === actions.GET_DECKS_SUCCESS)
    {
        console.log('action=getDecksSuccess');
        console.log(action.decks);
        return Object.assign({}, state, {
            decks: action.decks,
            loading:false,
            deckError:false
        });
    }

    else if (action.type === actions.GET_DECKS_ERROR)
    {
        console.log('action=getDecksError');
        console.log(action.decks);
        return Object.assign({}, state, {
            loading:false,
            deckError:true
        });
    }

    else if(action.type === actions.GET_DECKS_REQUEST)
    {
        console.log('action = getDecksRequest');
        return Object.assign({}, state, {
            loading:true,
            deckError:false
        });
    }


    else if (action.type === actions.PUT_DECKS_REQUEST)
    {
        console.log('action = putDecksRequest');
        return Object.assign({}, state, {
            loading:true,
            reviewError: false
        });
    }

    else if(action.type === actions.PUT_DECKS_SUCCESS)
    {
        return Object.assign({}, state, {
            loading:false,
            reviewError:false
        });
    }

    else if(action.type === actions.PUT_DECKS_ERROR)
    {
        return Object.assign({}, state, {
            loading:false,
            reviewError: true
        });
    }


    else if (action.type === actions.REGISTER_REQUEST)
    {
        console.log('action = registerRequest');
        return Object.assign({}, state, {
            loading:true,
            registerError:null
        });
    }

    else if(action.type === actions.REGISTER_SUCCESS)
    {
        return Object.assign({}, state, {
            loading:false,
            page:'register-success',
            title:'Registration Success',
            registerError:null
        });
    }

    else if(action.type === actions.REGISTER_ERROR)
    {
        return Object.assign({}, state, {
            registerError: action.err.message,
            loading:false,
        });
    }

    else if (action.type === actions.HANDLE_NAV)
    {
        switch(action.navText.toLowerCase())
        {
            case 'logout': 
                console.log('user logged out');
                //We need to clear our authToken here
                return Object.assign({}, state, {
                    page: 'login',
                    title:'Weekly Words',
                    showNav: false,
                    review: initialState.review
                });
            case 'end':
                return Object.assign({}, state, {
                    page: 'decks',
                    title:'Decks',
                    navText: 'logout',
                    showNav: true,
                    review: initialState.review
                });
            default:
                console.log('Error: Button had no navtext');
            break;

        }
    }

    else if (action.type === actions.GO_REGISTER)
    {
        return Object.assign({}, state, {
            page:'register',
            title:'Register',
            showNav:false
        });
    }

    else if (action.type === actions.GO_LOGIN)
    {
        return Object.assign({}, state, {
            page:'login',
            title:'Weekly Words',
            showNav: false
        });
    }

    else if (action.type === actions.DISPLAY_HELP)
    {
        return Object.assign({}, state, {
            showHelp: true
        });
    }

    else if (action.type === actions.HIDE_HELP)
    {
        return Object.assign({}, state, {
            showHelp: false
        });
    }

    //Default
    return state;
}

