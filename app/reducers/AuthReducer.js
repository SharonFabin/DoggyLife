import {
    AUTH_CREATE_USER,
    AUTH_CREATE_USER_FAIL,
    AUTH_CREATE_USER_SUCCESS,
    AUTH_LOGIN_USER,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_USER_FAIL
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    errorLogging: '',
    errorCreating: '',
    loading: false,
};

const auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_CREATE_USER:
            return {...state, ...INITIAL_STATE, loading: true};
        case AUTH_CREATE_USER_FAIL:
            return {
                ...state,
                errorLogging: action.err,
                errorCreating: 'Creation failed! Please check the credentials!',
                loading: false
            };
        case AUTH_CREATE_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE
            };
        case AUTH_LOGIN_USER:
            return {
                ...state,
                ...INITIAL_STATE,
                loading: true,
            };
        case AUTH_LOGIN_USER_FAIL:
            return {
                ...state,
                errorLogging: action.err,
                errorCreating: 'Login failed! Please check the credentials!',
                loading: false
            };
        case AUTH_LOGIN_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE
            };
        case AUTH_USER_FAIL:
            return {
                ...state,
                errorCreating: "Authentication Failed",
                loading: false
            };
        default:
            return state;
    }
};

export default auth;
