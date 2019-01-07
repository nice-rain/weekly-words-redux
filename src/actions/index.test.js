import {
    GET_DECKS_SUCCESS,
    getDecksSuccess,
    getDecksRequest,
    getDecks,
    doLogin,
    loginSuccess,
    LOGIN_SUCCESS,
    loginRequest, 
    doRegister,
    registerSuccess,
    registerRequest,
    REGISTER_SUCCESS,
    putDeckStats,
    putDecksRequest,
    putDecksSuccess,
    PUT_DECKS_SUCCESS
} from './index';

describe('getDecksSuccess', () => {
    it('Should return the action', () => {
        const decks = [{
            cards: []
        }];
        const action = getDecksSuccess(decks);
        expect(action.type).toEqual(GET_DECKS_SUCCESS);
        expect(action.decks).toEqual(decks);
    });
});

describe('getDecks', () => {
    it('Should dispatch getDecksSuccess after getDecksRequest', () => {
        const deck = [{
            authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicmFpbiIsIm5hbWUiOiJOaWNlIFJhaW4ifSwiaWF0IjoxNTQ2NzM4ODY2LCJleHAiOjE1NDczNDM2NjYsInN1YiI6InJhaW4ifQ.dSgevVZJee2QZSGWX9UZ-zMQDhfoicxMcw4mUMV4S6w",
            displayInfo: false
        }];

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return deck;
                }
            })
        );

        const dispatch = jest.fn();
        return getDecks()(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/api/decks/`,
            {
                'headers':{
                    'content-type':'application/json',
                    'Authorization':`Bearer ${null}`
                },
                'method':'GET'
            });
            expect(dispatch).toHaveBeenCalledWith(getDecksRequest());
            expect(dispatch).toHaveBeenCalledWith(getDecksSuccess(deck));
        });
    });
});

describe('loginSuccess', () => {
    it('Should return the action', () => {
        const action = loginSuccess();
        expect(action.type).toEqual(LOGIN_SUCCESS);
    });
});

describe('doLogin', () => {
    it('Should dispatch loginSuccess after doLogin', () => {
        const auth = [{
            authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicmFpbiIsIm5hbWUiOiJOaWNlIFJhaW4ifSwiaWF0IjoxNTQ2NzM4ODY2LCJleHAiOjE1NDczNDM2NjYsInN1YiI6InJhaW4ifQ.dSgevVZJee2QZSGWX9UZ-zMQDhfoicxMcw4mUMV4S6w",
        }];

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return auth;
                }
            })
        );

        const dispatch = jest.fn();
        return doLogin()(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/api/auth/login`,
            {
                "headers":{
                    "content-type":"application/json"
                },
                "body":undefined,
                "method":"POST"
            });
            expect(dispatch).toHaveBeenCalledWith(loginRequest());
            expect(dispatch).toHaveBeenCalledWith(loginSuccess());
        });
    });
});


describe('registerSuccess', () => {
    it('Should return the action', () => {
        const action = registerSuccess();
        expect(action.type).toEqual(REGISTER_SUCCESS);
    });
});

describe('doRegister', () => {
    it('Should dispatch registerSuccess after doRegister', () => {
        
        //Simple body return
        const auth = [{
            authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicmFpbiIsIm5hbWUiOiJOaWNlIFJhaW4ifSwiaWF0IjoxNTQ2NzM4ODY2LCJleHAiOjE1NDczNDM2NjYsInN1YiI6InJhaW4ifQ.dSgevVZJee2QZSGWX9UZ-zMQDhfoicxMcw4mUMV4S6w",
        }];

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return auth;
                }
            })
        );

        const values = undefined;

        const dispatch = jest.fn();
        return doRegister(values)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/api/users`,
            {
                "headers":{
                    "content-type":"application/json"
                },
                "body":undefined,
                "method":"POST"
            });
            expect(dispatch).toHaveBeenCalledWith(registerRequest());
            expect(dispatch).toHaveBeenCalledWith(registerSuccess());
        });
    });
});


describe('putDecksSuccess', () => {
    it('Should return the action', () => {
        const action = putDecksSuccess();
        expect(action.type).toEqual(PUT_DECKS_SUCCESS);
    });
});

describe('putDeckStats', () => {
    it('Should dispatch putDecksSuccess after putDeckStats', () => {
        
        //Simple body return
        const auth = [{
            authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicmFpbiIsIm5hbWUiOiJOaWNlIFJhaW4ifSwiaWF0IjoxNTQ2NzM4ODY2LCJleHAiOjE1NDczNDM2NjYsInN1YiI6InJhaW4ifQ.dSgevVZJee2QZSGWX9UZ-zMQDhfoicxMcw4mUMV4S6w",
        }];

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return auth;
                }
            })
        );

        const stats = {
            id:1
        };

        const dispatch = jest.fn();
        return putDeckStats(stats)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/api/decks/1`,
            {
                "headers":{
                    "content-type":"application/json",
                    "Authorization":"Bearer undefined"
                },
                "body":JSON.stringify(stats),
                "method":"PUT"
            });
            expect(dispatch).toHaveBeenCalledWith(putDecksRequest());
            expect(dispatch).toHaveBeenCalledWith(putDecksSuccess());
        });
    });
});