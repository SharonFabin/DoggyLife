import { HIGHLIGHT_FETCH_ALL, HIGHLIGHT_CREATE } from '../constants/ActionTypes';

const INITIAL_STATE = [];

const highlight = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HIGHLIGHT_FETCH_ALL:
      return { ...state, highlights: action.payload };
    case HIGHLIGHT_CREATE:
      return { ...state };
    default:
      return state;
  }
};

export default highlight;
