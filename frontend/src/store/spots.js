import { csrfFetch } from "./csrf";

const initialState  = {}

const LOAD = 'spots/LOAD';
const ADD_ONE = 'spots/ADD_ONE';
const CREATE = 'spots/CREATE';
const UPDATE = 'spots/UPDATE';
const DELETE = 'spots/DELETE';
// const AUTHORIZE = 'spots/AUTHORIZE';

export const loadSpots = (list) => ({
    type: LOAD,
    list
})

export const addOneSpot = (spot) => ({
    type: ADD_ONE,
    spot
})

export const createSpot = (spot) => ({
    type: CREATE,
    spot
})

export const updateSpot = (spotId) => ({
    type: UPDATE,
    spotId
})

export const deleteSpot = (spotId) => ({
    type: DELETE,
    spotId
})

// export const authSpot = (spot) => ({

// })

export const createNewSpot = (spot, imagePayload) => async dispatch => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const {prevImage, images} = imagePayload;

    const res = await csrfFetch('api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })

    const newSpot = res.json();

    const idRes = await csrfFetch(`/api/spots/${newSpot.id}`)

    if(prevImage) {
        const prevImgRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            body: {
                url: prevImage,
                preview: true
            }
        })
    }

    images.map(async (image) => {
        const imgRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            body: {
                url: image,
                preview: false
            }
        })
    })


    if(res.ok) {
        const newSpotDetails = idRes.json();

        dispatch(createSpot(newSpotDetails))
    }
}

export const getSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const list = await res.json();
        // list will be an object with key of 'Spots' and a value of an array of spots
        dispatch(loadSpots(list))
    }
}

export const getSpotById = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if(res.ok) {
        const spotDetails = await res.json()

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
            newState = {...state, 'spot' : action.spot};

            return newState;
        case CREATE:
            newState = {...state};

            newState.spots.push(action.spot)

            return newState;
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
