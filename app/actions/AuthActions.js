import {
    AUTH_CREATE_USER,
    AUTH_CREATE_USER_FAIL,
    AUTH_CREATE_USER_SUCCESS,
    AUTH_LOGIN_USER,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_USER_FAIL
} from '../constants/ActionTypes';
import {Actions} from 'react-native-router-flux';
import database from "../api/database";

const subscribeToAuthentication = () => {
    return dispatch => {
        dispatch({type: AUTH_LOGIN_USER});
        database.authSubscribe(dispatch, authChanged);
    };
};

const unsubscribeFromAuthentication = () => {
    database.authUnsubscribe();
};

const authChanged = (dispatch, user) => {
    if (user)
        loginUserSuccess(dispatch, user);
    else
        userNotAuthenticated(dispatch);
};

const userNotAuthenticated = (dispatch) => {
    dispatch({type: AUTH_USER_FAIL});
    Actions.login();
};

//TODO: do i need to send payload user?
const loginUserSuccess = (dispatch, user, action) => {
    dispatch({
        type: AUTH_LOGIN_USER_SUCCESS,
    });
    if (action) {
        action();
    } else {
        Actions.app();
    }
};

const loginUserFail = (dispatch, err, action) => {
    dispatch({
        type: AUTH_LOGIN_USER_FAIL,
        err: err.message
    });

    if (action) {
        action();
    }
};

const loginUser = (email, password, action) => {
    return dispatch => {
        dispatch({type: AUTH_LOGIN_USER});
        database.loginUser(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user, action);
            })
            .catch(err => {
                loginUserFail(dispatch, err, action);
            });
    };
};

const createUser = (username, email, password, userpic, action) => {
    return dispatch => {
        dispatch({type: AUTH_CREATE_USER});
        database.createUser(username, email, password, userpic)
            .then(() => {
                createUserSuccess(dispatch, action);
            })
            .catch(err => {
                createUserFail(dispatch, err, action);
            });
    };
};

const createUserSuccess = (dispatch, action) => {
    dispatch({
        type: AUTH_CREATE_USER_SUCCESS,
    });
    if (action) {
        action();
    } else {
        Actions.app();
    }
};

const createUserFail = (dispatch, err, action) => {
    dispatch({
        type: AUTH_CREATE_USER_FAIL,
        err: err.message
    });
    if (action) {
        action();
    }
};

const logoutUser = () => {
    return dispatch => {
        Actions.reset('app');
        database.logoutUser()
            .then(() => logoutUserSuccess(dispatch))
            .catch(err => logoutUserFail(dispatch, err));
    }
};

const logoutUserSuccess = dispatch => {
    dispatch({type: AUTH_LOGIN_USER_FAIL});
    Actions.auth({type: 'reset'})
};

const logoutUserFail = (dispatch, err) => {
    alert(err);
};

export {
    subscribeToAuthentication,
    unsubscribeFromAuthentication,
    loginUser,
    createUser,
    logoutUser
};