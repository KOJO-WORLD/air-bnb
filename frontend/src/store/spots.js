import { csrfFetch } from "./csrf";

const initialState  = {
    // spots: []
}

const LOAD = 'spots/LOAD';
const ADD_ONE = 'spots/ADD_ONE';
// const CREATE = 'spots/CREATE';
// const UPDATE = 'spots/UPDATE'
const DELETE = 'spots/DELETE'

export const loadSpots = (list) => ({
    type: LOAD,
    list
})

export const addOneSpot = (spot) => ({
    type: ADD_ONE,
    spot
})

export const deleteSpot = (spotId) => ({
    type: DELETE,
    spotId
})

// export const createSpot = (spot) => async dispatch => {
//     const res = await csrfFetch('api/spots', {
//         method: 'POST',
//         body: JSON.stringify({

//         })
//     })

//     if(res.ok) {
//         const newSpot = res.json();

//         dispatch()
//     }
// }

export const getSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const list = await res.json();
        // console.log('list', list);
        // list will be an object with key of 'Spots' and a value of an array of spots
        dispatch(loadSpots(list))
    }
}

export const getSpotById = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    // '/api/spots/:id'

    if(res.ok) {
        const spotDetails = await res.json()
        console.log('hit');
        console.log(spotDetails);
        //dispatch action for a single spot
        dispatch(addOneSpot(spotDetails));
    }
}

export const deleteSpotById = (spotId) => async dispatch => {
    const res = csrfFetch('/api/spots/:spotId', {
        method: 'DELETE'
    })

    if(res.ok) {
        const message = res.json();
        console.log(message);
        dispatch(deleteSpot(spotId));
    }

}

const spotsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD:
            newState = {...action.list.Spots};
            return newState;
        case ADD_ONE:
            newState = {...state, [action.spot.id] : action.spot};
            return newState;
        // case CREATE:
        //     return newState;
        // case UPDATE:
        //     return newState;
        case DELETE:
            newState = Object.values(state.spots).filter(spot => spot.id !== action.spotId)
            console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default spotsReducer
