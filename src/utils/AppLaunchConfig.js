import {I18nManager} from 'react-native';
import store from '../store/store';
import {initLang} from '../actions';
import I18n from 'react-native-i18n';
import ar from '../common/defaults/ar.json';
import en from '../common/defaults/en.json';
import appAr from '../translation/appAr.json';
import appEn from '../translation/appEn.json';
import configRestApi from '../api/utils/config';

import {registerCustomIconType} from '../common';
import icoMoonConfig from '../common/utils/selection.json';
// import Notifications from './Notifications';

const configTranslation = async () => {
  I18n.fallbacks = true;

  I18n.translations = {
    ar: {...ar, ...appAr},
    en: {...en, ...appEn},
  };

  const lang = I18nManager.isRTL ? 'ar' : 'en';
  await initLang(lang, I18nManager.isRTL)(store.dispatch);
};

export default async () => {
  // const notifications = new Notifications();
  //icons
  await registerCustomIconType('custom', icoMoonConfig);
  //default ar

  await configTranslation();
  // await notifications.checkPermission();

  configRestApi();
};
