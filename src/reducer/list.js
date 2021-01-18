import {REFRESH_LIST} from '../actions/types';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_LIST:
      return {...state, [action.list]: !state[action.list]};

    default:
      return state;
  }
};

export default reducer;
