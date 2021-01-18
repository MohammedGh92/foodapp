import {SET_INTERNET_CONNECTION} from '../actions/types';

const initialState = {
  isConnected: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERNET_CONNECTION:
      return {...state, isConnected: action.payload};
    default:
      return state;
  }
};

export default reducer;
