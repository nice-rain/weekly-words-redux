//Our base API URL
//const BASE_API_URL = 'https://fullstack-dev.pro/ww/api'

const {API_BASE_URL} = require('../config');

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

export const HANDLE_NAV = 'HANDLE_NAV';
export const handleNav = (navText) =>({type: HANDLE_NAV, navText}); 

//Called when we click the check (correct) button on card back
export const RIGHT_ANSWER = 'RIGHT_ANSWER';
export const rightAnswer = ()=>({type: RIGHT_ANSWER});

//Called when we click the x (incorrect) button on the card back
export const WRONG_ANSWER = 'WRONG_ANSWER';
export const wrongAnswer = ()=> ({type: WRONG_ANSWER});

//Called when we click the 'home' button on the results page
export const RETURN_HOME = 'RETURN_HOME';
export const returnHome = ()=>({type: RETURN_HOME});

//Called from login page to change us to registration
export const GO_REGISTER = 'GO_REGISTER';
export const goRegister = () =>({type: GO_REGISTER});

//Called from login page to change us to registration
export const GO_LOGIN = 'GO_LOGIN';
export const goLogin = () =>({type: GO_LOGIN});

//Shows help screen
export const DISPLAY_HELP = 'DISPLAY_HELP';
export const displayHelp = () =>({type: DISPLAY_HELP});

//Hides help screen
export const HIDE_HELP = 'HIDE_HELP';
export const hideHelp = () =>({type: HIDE_HELP});

//=======================================================
// REQUEST, SUCCESS, FAIL for REST API
//=======================================================

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = () => ({type: LOGIN_REQUEST});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = () => ({type: LOGIN_SUCCESS});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (err) => ({type: LOGIN_ERROR, err});


export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const registerRequest = () => ({type: REGISTER_REQUEST});

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = () => ({type: REGISTER_SUCCESS});

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const registerError = (err) => ({type: REGISTER_ERROR, err});


export const GET_DECKS_REQUEST = 'GET_DECKS_REQUEST';
export const getDecksRequest = () => ({type: GET_DECKS_REQUEST});

export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS';
export const getDecksSuccess = (decks) => ({type: GET_DECKS_SUCCESS, decks});

export const GET_DECKS_ERROR = 'GET_DECKS_ERROR';
export const getDecksError = (err) => ({type: GET_DECKS_ERROR, err});

//Use this to update stats before we call the put request.
export const PUT_DECKS_REQUEST = 'PUT_DECKS_REQUEST';
export const putDecksRequest = () => ({type: PUT_DECKS_REQUEST});

export const PUT_DECKS_SUCCESS = 'PUT_DECKS_SUCCESS';
export const putDecksSuccess = () => ({type: PUT_DECKS_SUCCESS});

export const PUT_DECKS_ERROR = 'PUT_DECKS_ERROR';
export const putDecksError = (err) => ({type: PUT_DECKS_ERROR, err});

//=======================================================
// Redux Thunk Actions
//=======================================================
export const doLogin = (values) => dispatch => {
    //console.log('login fired');
    //Show our loading for our login
    dispatch(loginRequest());

    //Send our AJAX request
    return fetch(`${API_BASE_URL}/auth/login`, {
            "headers":{
                "content-type":"application/json"
            },
            "body":JSON.stringify(values),
            "method":"POST"
        }).then(res => {
        if (!res.ok) {
            return Promise.reject(res);
        }
        return res.json();
    }).then(res => {
        //console.log('Ajax success');

        //Store it in sessionstorage (for now). No need to load persistence.
        try {
            sessionStorage.setItem('authToken', res.authToken);
        } catch (e) {
            //console.log('unable to set auth token');
        }

        //Notifies our application to switch to Decks page.
        dispatch(loginSuccess());

    }).catch(err => {
        //console.log(err);
        //Throw an error
        dispatch(loginError(err));
    });
};

//Register a new user
export const doRegister = (values) => dispatch => {
    //console.log('register fired');
    //console.log(values);

    //Show our loading for our login
    dispatch(registerRequest());

    //Set Timeout to test loading
    //setTimeout(() => {

    //Send our AJAX request
    return fetch(`${API_BASE_URL}/users`, {
            "headers":{
                "content-type":"application/json"
            },
            "body":JSON.stringify(values),
            "method":"POST"
        }).then(res => {
        // if (!res.ok) {
        //     return Promise.reject(res.json());
        // }
        return res.json();
    }).then(res => {

        if(res.code)
        {
            return Promise.reject(res);  
        }
        //console.log('Registration success');
        //Notifies our application to switch to Decks page.
        dispatch(registerSuccess());

    }).catch(err => {
        dispatch(registerError(err));
    });


    //End of loading timeout
    //}, 1000);

};

//Action for GET request for all decks.
export const getDecks = () => dispatch => {
    dispatch(getDecksRequest());

    return fetch(`${API_BASE_URL}/decks/`,
    {
        'headers':{
            'content-type':'application/json',
            'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`
        },
        'method':'GET'
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res);
        }
        return res.json();
    })
    .then(res => {
        //console.log('GET Decks success');

        const decks = res.map(deck =>{
            return {...deck, displayInfo:false};
        });

        //Notifies our application to switch to Decks page.
        dispatch(getDecksSuccess(decks));

    })
    .catch(err => {
        //console.log(err);
        //Throw an error
        dispatch(getDecksError(err));
    });
};

export const putDeckStats = (stats) => dispatch =>
{
    dispatch(putDecksRequest());

    const request = JSON.stringify(stats);
    //console.log(request);

    return fetch(`${API_BASE_URL}/decks/${stats.id}`,
    {
        'headers':{
            'content-type':'application/json',
            'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`
        },
        'body':JSON.stringify(stats),
        'method':'PUT'
    })
    .then(res => {
        if (!res.ok) {
            //console.log(res);
            return Promise.reject(res);
        }
        return res;
    })
    .then(res => {
        //console.log('PUT Decks success');
        //Notifies our application to switch to Decks page.
        dispatch(putDecksSuccess());

    })
    .catch(err => {
        //console.log(err);
        //Throw an error
        dispatch(putDecksError(err));
    });

}