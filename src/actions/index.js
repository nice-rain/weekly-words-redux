//Called when we click on a deck button
export const SHOW_HIDE_DECK_INFO = 'SHOW_HIDE_DECK_INFO';
export const showHideDeckInfo = index =>({
    type: SHOW_HIDE_DECK_INFO,
    index
});

//Called when we click Start Review button on a single deck
//Index refers to the deck's index that we are going to review
export const START_REVIEW = 'START_REVIEW';
export const startReview = index => ({
    type: START_REVIEW,
    index
});

//Called when we click the 'flip button on the card front
//Card index is the index of the card in the review
export const FLIP_CARD = 'FLIP_CARD';
export const flipCard = cardIndex => ({
    type: FLIP_CARD,
    cardIndex
});

//Called when we click the check (correct) button on card back
export const RIGHT_ANSWER = 'RIGHT_ANSWER';
export const rightAnswer = ()=>({type: RIGHT_ANSWER});

//Called when we click the x (incorrect) button on the card back
export const WRONG_ANSWER = 'WRONG_ANSWER';
export const wrongAnswer = ()=> ({type: WRONG_ANSWER});

//Called when we click the 'home' button on the results page
export const RETURN_HOME = 'RETURN_HOME';
export const returnHome = ()=>({type: RETURN_HOME});