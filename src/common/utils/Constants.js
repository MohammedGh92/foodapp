import {Platform} from 'react-native';

//adds
export const ADD_APP_ID = 'ca-app-pub-1204869118712201~4042749576';
export const BANNER_ADD_ID = 'ca-app-pub-1204869118712201/9614640457'; //TEST ID ca-app-pub-3940256099942544/6300978111
export const BANNER_ADD_SIZE = 'smartBannerPortrait';

export const RADIO_BUTTON_DISPLAY_NAME = 'RadioButton';
export const CHECK_BOX_DISPLAY_NAME = 'CheckBox';
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 54 : 56;
export const API_REQUESTS_LIMIT = 5;
export const GOOGLE_KEY = 'AIzaSyC4d3O454l33RC0AxSSKnciK2GLYrSC6bg';

export const PICKER_OPTIONS = {
  title: 'Select Picture',
  storageOptions: {
    quality: 0.1,
    maxWidth: 100,
    maxHeight: 100,
    skipBackup: true,
    path: 'images',
  },
};

export const MOBILE_LENGTH = 15;

const BAR_HEIGHT_ANDROID = 55;
const BAR_HEIGHT_IOS = 49;
export const BAR_HEIGHT =
  Platform.OS === 'ios' ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;
