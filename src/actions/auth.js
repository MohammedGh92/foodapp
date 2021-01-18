import {LOGIN_SUCCESS,JUST_DATA} from './types';

export const setUserData = (userData) => {
  return {type: LOGIN_SUCCESS, payload: userData};
};

export const setData = (userData) => {
  return {type: JUST_DATA, payload: userData};
};

