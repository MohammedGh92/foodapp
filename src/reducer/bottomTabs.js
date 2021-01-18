import * as types from '../actions/types';

const initialState = {
  selectedIndx: 0,
  notificationCounter: 0,
};

const BottomTabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_TAB:
      return {...state, selectedIndx: action.payload};
    case types.SET_UNSEEN_COUNT:
      return {...state, notificationCounter: action.payload};
    default:
      return state;
  }
};
export default BottomTabsReducer;
