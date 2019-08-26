import {PROFILE_EDIT, PROFILE_FETCH} from '../constants/ActionTypes';

const INITIAL_STATE = {
    profile: {
        userpic: ""
    },
    dogs: {}
};

const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_FETCH:
      return { ...state, profile: action.payload };
    case PROFILE_EDIT:
      return { ...state };
    default:
      return state;
  }
};

export default profile;
