import {
  SET_GPS_STATUS,
  SET_LOCATION_PERMESSIONS_STATUS,
} from '../actions/types';

const initialState = {
  IsGpsOn: false,
  IsLocationOn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GPS_STATUS:
      return {...state, IsGpsOn: action.payload};
    case SET_LOCATION_PERMESSIONS_STATUS:
      return {...state, IsLocationOn: action.payload};
    default:
      return state;
  }
};
