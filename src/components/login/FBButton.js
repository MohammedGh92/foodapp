import React from 'react';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import SocialBtn from '../SocialBtn';
import {AuthRepo} from '../../repo';
import {AppNavigation} from '../../common';
const authRepo = new AuthRepo();
const requestToLogin = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile']);
    if (result.isCancelled) {
      console.log('Login cancelled');
    } else {
      const token = await AccessToken.getCurrentAccessToken();
      console.log(token, 'token');
      const res = await authRepo.signIn({
        type: 'facebook',
        access_token: token.accessToken,
      });
      if (res) {
        AppNavigation.navigateToHome();
      }
    }
  } catch (error) {
    console.log('Login fail with error: ', JSON.parse(JSON.stringify(error)));
  }
};
const FBButton = () => {
  return (
    <SocialBtn
      backgroundColor="#164CBD"
      name="facebook-f"
      type="font-awesome"
      color="white"
      size={9}
      onPress={requestToLogin}
    />
  );
};

export default FBButton;
