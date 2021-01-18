import React from 'react';
import SocialBtn from '../SocialBtn';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AuthRepo} from '../../repo';
import {AppNavigation, showError} from '../../common';

const authRepo = new AuthRepo();

GoogleSignin.configure({
  offlineAccess: false,
  webClientId:
    '81893479098-bqfdm6c5jrid1rabkdlcve822hr2bo6f.apps.googleusercontent.com',
});
const signIn = async () => {
  try {
    // await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo, 'userInfo');
    const res = await authRepo.signIn({
      type: 'google',
      access_token: userInfo.idToken,
    });
    if (res) {
      AppNavigation.navigateToHome();
    }
  } catch (error) {
    if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log(error, JSON.parse(JSON.stringify(error)));
      showError(error.message);
    }
  }
};
const GoogleBtn = () => {
  return (
    <SocialBtn
      onPress={signIn}
      backgroundColor="#DD4C39"
      name="google"
      type="material-community"
      color="white"
      size={9}
    />
  );
};

export default GoogleBtn;
