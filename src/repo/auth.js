import ApiAuth from '../api/auth';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { ApiErrorTypes } from '../api/utils/errors';
import { showError, AppNavigation, showSuccess, showInfo } from '../common';
import I18n from 'react-native-i18n';
import store from '../store/store';
import { setUserData, setData } from '../actions/auth';
import {
  dataToFormData,
  objectToArray,
  AppendImgValue,
} from './utils/dataFormation';
// import NotificationRepo from './notification';
import Axios from 'axios';

import * as urls from '../api/utils/urls';
import { SET_UNSEEN_COUNT } from '../actions/types';
export default class Auth {
  constructor() {
    this.apiAuth = new ApiAuth();

    // this.notificationRepo = new NotificationRepo();
  }

  signIn = async (values) => {
    let success = true;
    try {
      const userData = await this.apiAuth.signIn(
        dataToFormData({
          ...values
        }),
      );
      await this.setPrincipalUser(userData);
      await store.dispatch({
        type: SET_UNSEEN_COUNT,
        payload: userData.unreadCount,
      });
      AppNavigation.navigateToHome();
    } catch (error) {
      console.log('signIn error:' + error);
      if (error.hasOwnProperty('isActive')) {
        success = {
          status: false,
          isActive: error.isActive,
        };
      } else {
        showError(error.msg);
        success = false;
      }
    } finally {
      return success;
    }
  };

  registerData = async (values) => {
    const data = dataToFormData(values);
    let success = true;
    try {
      const userData = await this.apiAuth.registerData(data);
      await this.setPrincipalUser(userData);
      AppNavigation.navigateToHome();
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  resetPassword = async (values) => {
    let success = true;
    try {
      const { active_login } = await this.apiAuth.resetPassword(
        dataToFormData(values),
      );
      if (!active_login) {
        success = null;
      } else {
        showInfo(
          I18n.t(
            active_login === 'phone'
              ? 'code-sent-to-phone'
              : 'code-sent-to-email',
          ),
        );
      }
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  changePassword = async (values) => {
    let success = true;
    try {
      const res = await this.apiAuth.changePassword(values);
      console.log(res, 'RESS');
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  updateUser = async (
    { profile_image, license_image, national_card_image, ...rest },
    setSubmitting,
    action,
  ) => {
    const data = dataToFormData({ ...rest });
    AppendImgValue(data, { name: 'profile_image', value: profile_image });
    AppendImgValue(data, { name: 'license_image', value: license_image });
    AppendImgValue(data, {
      name: 'national_card_image',
      value: national_card_image,
    });
    let userData = null;
    try {
      userData = await this.apiAuth.updateUser(data);

      if (userData.status === 'faild') {
        const errors = objectToArray(userData.errors);
        console.log(errors);
        showError(errors[0][0]);
        setSubmitting(false);
      } else {
        showSuccess(I18n.t('updated-successfully'));

        if (action) {
          action();
        } else {
          const currentUser = store.getState().auth.userData;
          currentUser.data = userData;
          await this.setPrincipalUser(currentUser);
          AppNavigation.navigateToHome();
        }
      }
    } catch (error) {
      setSubmitting(false);
      showError(error.msg);
      console.log(
        error,
        JSON.parse(JSON.stringify(error)),
        'register Delivery Error',
      );
    } finally {
      return userData;
    }
  };

  forgetPassword = async (values, setSubmitting) => {
    const data = dataToFormData(values);
    let res = null;
    try {
      res = await this.apiAuth.forgetPassword(data);
      console.log(res, 'forgot password');
      if (res.code !== 401) {
        // AppNavigation.push({
        //   name: 'confirmPassword',
        //   passProps: {
        //     data: {
        //       mobile: values.mobile,
        //       code: res.data,
        //     },
        //   },
        // });

        AppNavigation.push({
          name: 'verifyCode',
          passProps: {
            data: { mobile: values.mobile, code: res.data },
            screen: 'confirmPassword',

            // number: 3,
          },
        });
      } else {
        const errors = objectToArray(res.errors);
        showError(errors[0][0]);
      }
    } catch (error) {
      console.log(error);
      showError(error.msg);
    } finally {
      setSubmitting(false);
      return res;
    }
  };

  verifyCode = async (data) => {
    let success = true;
    try {
      const res = await this.apiAuth.verifyCode(dataToFormData(data));
      console.log(res, 'verifyCode');
    } catch (error) {
      success = false;
      showError(error.msg);
    } finally {
      return success;
    }
  };

  resendCode = async (data = { phone }) => {
    const isSent = await this.apiAuth.resendCode(data);
    return isSent;
  };

  setPrincipalUser = async (userData) => {
    try {
      await store.dispatch(setUserData(userData));
      await AsyncStorage.setItem('@UserData', JSON.stringify(userData));
    } catch (error) {
      console.log('setPrincipalUser Error:' + error);
    }
  };

  setData = async () => {
    try {
      console.log('2:');
      const res = await this.apiAuth.getJustData();
      console.log('res:' + JSON.stringify(res));
      await store.dispatch(setData(res));
    } catch (error) {
      console.log('erer:' + JSON.stringify(error));
    }
  };

  checkPrincipalUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('@UserData');
      const convertedUserData = JSON.parse(userData);

      // this.notificationRepo.updateToken();
      return convertedUserData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getPrincipalUserProfileData = async (clientId) => {
    const userData = await this.apiAuth.getPrincipalUserProfileData(clientId);
    return userData;
  };

  logoutPrincipalUser = async () => {
    try {
      // const res = await this.apiAuth.logoutPrincipalUser();
      await this.setPrincipalUser(null);
      store.dispatch({ type: SET_UNSEEN_COUNT, payload: 0 });
      AppNavigation.navigateToAuth();
    } catch (error) {
      showError(error.msg);
      console.log(error);
      return null;
    } finally {
      await this.setPrincipalUser(null);
      store.dispatch({ type: SET_UNSEEN_COUNT, payload: 0 });
      AppNavigation.init('login');
    }
  };
}
