import {LOCATION_UPDATE, LOCATION_USERS_UPDATE} from '../constants/ActionTypes';

const INITIAL_STATE = {
    location: null,
    locations: []
};

const location = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATION_UPDATE:
            return {...state, location: action.payload};
        case LOCATION_USERS_UPDATE:
            return {...state, locations: action.payload};
        default:
            return state;
    }
};

export default location;
