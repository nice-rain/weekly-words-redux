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