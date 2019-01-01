//Our base API URL
const BASE_API_URL = 'http://localhost:8080/api'

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

//=======================================================
// REQUEST, SUCCESS, FAIL for REST API
//=======================================================

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = () => ({type: LOGIN_REQUEST});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = () => ({type: LOGIN_SUCCESS});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (err) => ({type: LOGIN_ERROR, err});


export const GET_DECKS_REQUEST = 'GET_DECKS_REQUEST';
export const getDecksRequest = () => ({type: GET_DECKS_REQUEST});

export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS';
export const getDecksSuccess = (decks) => ({type: GET_DECKS_SUCCESS, decks});

export const GET_DECKS_ERROR = 'GET_DECKS_ERROR';
export const getDecksError = (err) => ({type: GET_DECKS_ERROR, err});

//=======================================================
// Redux Thunk Actions
//=======================================================
export const doLogin = (values) => dispatch => {
    console.log('login fired');
    console.log(values);

    //Show our loading for our login
    dispatch(loginRequest());

    //Set Timeout to test loading
    //setTimeout(() => {

    //Send our AJAX request
    fetch(`${BASE_API_URL}/auth/login`, {
            "headers":{
                "content-type":"application/json"
            },
            "body":JSON.stringify(values),
            "method":"POST"
        }).then(res => {
        if (!res.ok) {
            console.log(res);
            return Promise.reject(res);
        }
        return res.json();
    }).then(res => {
        console.log('Ajax success');

        //Store it in sessionstorage (for now). No need to load persistence.
        try {
            sessionStorage.setItem('authToken', res.authToken);
        } catch (e) {}

        //Notifies our application to switch to Decks page.
        dispatch(loginSuccess());

    }).catch(err => {
        console.log(err);
        //Throw an error
        dispatch(loginError(err));
    });


    //End of loading timeout
    //}, 1000);

};

//Action for GET request for all decks.
export const getDecks = () => dispatch => {
    dispatch(getDecksRequest());

    fetch(`${BASE_API_URL}/decks/`,
    {
        'headers':{
            'content-type':'application/json',
            'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`
        },
        'method':'GET'
    })
    .then(res => {
        if (!res.ok) {
            console.log(res);
            return Promise.reject(res);
        }
        return res.json();
    })
    .then(res => {
        console.log('GET Decks success');

        const decks = res.map(deck =>{
            return {...deck, displayInfo:false};
        });

        //Notifies our application to switch to Decks page.
        dispatch(getDecksSuccess(decks));

    })
    .catch(err => {
        console.log(err);
        //Throw an error
        dispatch(getDecksError(err));
    });
};