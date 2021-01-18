import {REFRESH_LIST} from './types';

export const refreshList = (list) => async (dispatch, store) => {
  if (Array.isArray(list)) {
    list.forEach((l) => {
      dispatch({type: REFRESH_LIST, list: l});
    });
  } else {
    dispatch({type: REFRESH_LIST, list});
  }
};
