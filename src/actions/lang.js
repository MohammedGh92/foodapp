import AsyncStorage from '@react-native-community/async-storage';
import I18n from 'react-native-i18n';

import {SET_LANG} from './types';
import store from '../store/store';
import 'moment/locale/ar';
import moment from 'moment';

export const setLang = (lang, rtl) => async (dispatch) => {
  if (rtl === store.getState().lang.rtl) {
    return;
  }
  // moment.locale(lang);
  I18n.locale = lang;
  dispatch({type: SET_LANG, lang, rtl});
  await AsyncStorage.setItem('lang', JSON.stringify({lang, rtl}));
};

export const initLang = (lang, rtl) => async (dispatch, store) => {
  const l = await AsyncStorage.getItem('lang');
  if (l) {
    const d = JSON.parse(l);
    await setLang(d.lang, d.rtl)(dispatch, store);
  } else {
    await setLang(lang, rtl)(dispatch, store);
  }
};
