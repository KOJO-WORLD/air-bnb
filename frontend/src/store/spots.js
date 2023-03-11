import { csrfFetch } from "./csrf";
import { login } from "./session";

const initialState = {}

const LOAD = 'spots/LOAD';
const LOAD_CURR = 'spots/LOAD_CURR'
const ADD_ONE = 'spots/ADD_ONE';
const CREATE = 'spots/CREATE';
const UPDATE = 'spots/UPDATE';
const DELETE = 'spots/DELETE';
// const AUTHORIZE = 'spots/AUTHORIZE';

export const loadSpots = (list) => ({
    type: LOAD,
    list
})

export const loadCurrSpots = (list) => ({
    type: LOAD_CURR,
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

export const updateSpot = (spot) => ({
    type: UPDATE,
    spot
})

export const deleteSpot = (spotId) => ({
    type: DELETE,
    spotId
})

// export const authSpot = (spot) => ({

// })

export const createNewSpot = (spot, imagePayload) => async dispatch => {
    const { prevImage, images } = imagePayload;

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })

    const newSpot = await res.json();
    // console.log('new spot RAW', newSpot);

    const idRes = await csrfFetch(`/api/spots/${newSpot.id}`)

    const prevImgObj = {
        url: prevImage,
        preview: true
    }

    if (prevImage) {
        // console.log('prev url', prevImage);

        const prevImgRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            body: JSON.stringify(prevImgObj)
        })

        const prevIm = await prevImgRes.json();
        // console.log('preview', prevIm);
    }

    images.forEach(async (image) => {
        const imgObj = {
            url: image,
            preview: false
        }

        const imgRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            body: JSON.stringify(imgObj)
        })

        const img = await imgRes.json();
        // console.log('image', img);
    })


    if (res.ok) {
        const newSpotDetails = await idRes.json();
        // console.log('new spot fixed', newSpotDetails);
        dispatch(createSpot(newSpotDetails))
        return await newSpotDetails;
    }
}

export const getSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const list = await res.json();
        console.log("list", list);
        // list will be an object with key of 'Spots' and a value of an array of spots
        dispatch(loadSpots(list))
    }
}

export const getCurrSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current');

    if(res.ok) {
        const currList = await res.json();
        dispatch(loadCurrSpots(currList.Spots))
    }
}

export const getSpotById = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetails = await res.json()

        console.log('single', spotDetails);

        //dispatch action for a single spot
        dispatch(addOneSpot(spotDetails));
    }
}

export const updateSpotById = (spot, imagePayload) => async dispath => {
    const { spotId, address, city, state, country, lat, lng, name, description, price } = spot;

    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify({ address, city, state, country, lat, lng, name, description, price })
    })

    console.log('hit');

    if (res.ok) {
        const updatedSpot = await res.json()

        console.log('update', updatedSpot);

        dispath(updateSpot(updatedSpot))
    }
}

export const deleteSpotById = (spotId) => async dispatch => {
    const res = csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const message = res.json();
        console.log(message);
        dispatch(deleteSpot(spotId));
    }
}

const spotsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD:
            newState = { ...action.list.Spots };

            return newState;
        case LOAD_CURR:
            newState = action.list.reduce((state, spot) => {
                state[spot.id] = spot
                return state
            }, {})

            return newState;
        case ADD_ONE:
            // newState = { ...state, [action.spot.id]: action.spot };
            newState = {...state, 'spot': action.spot}

            // console.log('state checker');

            // console.log('add one action is ', action.spot);

            // newState.spots.spot = action.spot

            return newState;
        case CREATE:
            // console.log("create tester", state.Spots);
            newState = {...state, 'spot': action.spot}

            return newState;
        case UPDATE:
            newState = { ...state };

            const ind = newState.spots.findIndex(ele => ele.id === action.spot.id)

            newState.spots[ind] = action.spot

            newState.spots.spot = action.spot;

            return newState;
        case DELETE:
            newState = Object.values(state.spots).filter(spot => spot.id !== action.spotId)
            // console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default spotsReducer
