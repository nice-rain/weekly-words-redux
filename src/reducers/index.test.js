import {weeklyWordsReducer} from './index';
import {getDecksSuccess} from '../actions';

describe('weeklyWordsReducer', () => {
    // Set up some dummy data
    const newDeck = {
        "user": "rain",
        "id": "5c2c2ebeba49ea231490f7f7",
        "deckName": "Week 1",
        "deckReviewTotal": 0,
        "deckHighestAccuracy": 0,
        "deckLatestAccuracy": 0,
        "deckFastestTime": 0,
        "deckLatestTime": 0,
        "generatedDeck": {
            "_id": "5c2a5a81691a9a3f2c777187",
            "week": 1,
            "created": "2018-12-31T18:05:25.431Z",
            "cards": [
                {
                    "partOfSpeech": "noun",
                    "definition": "whirligig beetles",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c77719b",
                    "word": "family gyrinidae"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "a city in western Morocco; tourist center",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c77719a",
                    "word": "marrakesh"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "a hollow cast iron cylinder attached to the wheel that forms part of the brakes",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777199",
                    "word": "brake drum"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "a film made by photographing a series of cartoon drawings to give the illusion of movement when projected in rapid sequence",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777198",
                    "word": "cartoon"
                },
                {
                    "partOfSpeech": "verb",
                    "definition": "set the level or character of",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777197",
                    "word": "gear"
                },
                {
                    "partOfSpeech": "adverb",
                    "definition": "up to the knees",
                    "usage": "we were standing knee-deep in the water",
                    "_id": "5c2a5a81691a9a3f2c777196",
                    "word": "knee-deep"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "a distillate of petroleum (especially one used medicinally as a laxative or stool softener)",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777195",
                    "word": "mineral oil"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "an automobile contest that tests driving skill",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777194",
                    "word": "autocross"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "a condition in which a large group of people exhibit the same state of violent mental agitation",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777193",
                    "word": "mass hysteria"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "a farm on dry land operated without irrigation on the basis of moisture-conserving tillage and drought-resistant crops",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777192",
                    "word": "dry farmer"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "African plant with bright green evergreen leaves and umbels of many usually deep violet-blue flowers",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777191",
                    "word": "agapanthus africanus"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "going about to look at places of interest",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777190",
                    "word": "sightseeing"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "a South American toad; incubates its young in pits in the skin of its back",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c77718f",
                    "word": "surinam toad"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "a desert town in southeastern Algeria",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c77718e",
                    "word": "djanet"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "any of the important motor nerves on each side of the central nervous system that run from the sensorimotor areas of the cortex through the brainstem to motor neurons of the cranial nerve nuclei and the ventral root of the spinal cord",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c77718d",
                    "word": "corticospinal tract"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "basket stars",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c77718c",
                    "word": "euryale"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "the office of senator",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c77718b",
                    "word": "senatorship"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "monetary unit in Bahrain",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c77718a",
                    "word": "bahrainian monetary unit"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "the alveolar artery that supplies the upper teeth",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777189",
                    "word": "superior alveolar artery"
                },
                {
                    "partOfSpeech": "noun",
                    "definition": "someone who makes or repairs watches",
                    "usage": "",
                    "_id": "5c2a5a81691a9a3f2c777188",
                    "word": "horologist"
                }
            ],
            "__v": 0
        }
    };


    it('Should set the initial state when nothing is passed in', () => {
        const state = weeklyWordsReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual({
            decks: [],
            title: 'Weekly Words',
            navText:null,
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
        });
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = weeklyWordsReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('getDecksSuccess', () => {
        it('Should add all decks to state', () => {
            const decks = [newDeck];
            const state = weeklyWordsReducer(undefined, getDecksSuccess(decks));
            expect(state.decks).toEqual(decks);
        });
    });
});
