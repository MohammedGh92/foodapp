import {I18nManager} from 'react-native';
import {SET_LANG} from '../actions/types';

const initialState = {
  lang: I18nManager.isRTL ? 'ar' : 'en',
  rtl: I18nManager.isRTL,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return {...state, lang: action.lang, rtl: action.rtl};
    default:
      return state;
  }
};

export default reducer;
