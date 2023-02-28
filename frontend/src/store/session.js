// Uses POST /api/session backend route to login a user
import { csrfFetch } from "./csrf"

const initialState = {
    user: null
}

const SET = 'session/SET_SESSION_USER'
const REMOVE = 'session/REMOVE_SESSION_USER'

const setSessionUser = (user) => ({
    type: SET,
    user
})

const removeSessionUser = () => ({
    type: REMOVE,
})

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    // console.log(credential, password);
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    // console.log('user', data.user);
    dispatch(setSessionUser(data.user));
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        }),
    });
    const data = await response.json();
    console.log('check', data.user);
    dispatch(setSessionUser(data.user));
    return response;
};

const sessionReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case SET:
            newState = { ...state };
            newState.user = action.user;
            return newState
        case REMOVE:
            newState = { ...state };
            newState.user = null;
            return newState
        default:
            return state;
    }
}

export default sessionReducer
