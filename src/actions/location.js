import {SET_GPS_STATUS, SET_LOCATION_PERMESSIONS_STATUS} from './types';

export const setLocationPermessionsStatus = (status) => {
  return {type: SET_LOCATION_PERMESSIONS_STATUS, payload: status};
};

export const setGpsStatus = (status) => {
  return {type: SET_GPS_STATUS, payload: status};
};
