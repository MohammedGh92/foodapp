import * as types from '../actions/types';

const initialState = {
  userData: null,
  justData:null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {...state, userData: action.payload};

    case types.LOGOUT:
      return {...state, userData: null};

  case types.JUST_DATA:
  console.log('Reducer JUST_DATA:'+JSON.stringify(action.payload));
      return {...state, justData: action.payload};

    default:
      return state;
  }
};
