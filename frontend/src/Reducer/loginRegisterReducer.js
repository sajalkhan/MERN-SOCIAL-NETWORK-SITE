import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCCESS, LOGIN_FALI, LOGOUT, ACCOUNT_DELETED } from '../Action/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

const Reducer = (state = initialState, actions) => {

    const { type, payload } = actions;

    switch (type) {
    
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case ACCOUNT_DELETED:
        case REGISTER_FAIL:
        case LOGIN_FALI:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        default:
            return state;
    }
}

export default Reducer;