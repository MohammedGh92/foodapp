import React, {useCallback, useState} from 'react';
import AccountBtn from '../AccountBtn';
import WhiteView from './WhiteView';
import I18n from 'react-native-i18n';
import {AppNavigation} from '../../common';
import useFetch from '../useFetch';
import LoadingView from '../LoadingView';
import {UsersRepo} from '../../repo';
import store from '../../store/store';
const usersRepo = new UsersRepo();
const UserBtns = () => {
  const getProfileData = useCallback(async () => {
    return await usersRepo.getProfileData(
      store.getState().auth.userData?.user?.id,
    );
  }, []);
  const {isLoading, data} = useFetch(getProfileData);
  const push = useCallback(
    (name) => {
      AppNavigation.push({
        name,
        passProps: {
          data,
        },
      });
    },
    [data],
  );

  const pushFollowers = useCallback((name, title) => {
    AppNavigation.push({
      name,
      passProps: {
        title,
      },
    });
  }, []);
  const pushUserData = useCallback(() => {
    push('myData');
  }, [push]);
  const pushPrefrences = useCallback(() => {
    push('prefrences');
  }, [push]);

  const pushcarData = useCallback(() => {
    push('carData');
  }, [push]);
  const pushBankData = useCallback(() => {
    push('bankData');
  }, [push]);

  console.log(data);
  return (
    <WhiteView marginVertical={5} height={14} row spaceAround>
      {isLoading ? (
        <LoadingView />
      ) : (
        <>
          <AccountBtn
            onPress={pushUserData}
            size={4}
            textSize={4}
            circleRadius={5}
            name="user"
            type="font-awesome5"
            title={I18n.t('my-data')}
          />
          <AccountBtn
            size={4}
            textSize={4}
            circleRadius={5}
            onPress={pushPrefrences}
            title={I18n.t('preferences')}
            iconStyle={{
              transform: [
                {
                  rotate: '180deg',
                },
              ],
            }}
            name="medal-outline"
            type="material-community"
          />
          <AccountBtn
            size={4}
            textSize={4}
            circleRadius={5}
            onPress={pushcarData}
            name="ios-car-outline"
            type="ion"
            title={I18n.t('car-data')}
          />
          <AccountBtn
            size={4}
            textSize={4}
            circleRadius={5}
            onPress={pushBankData}
            name="ios-wallet-outline"
            type="ion"
            title={I18n.t('bank-account')}
          />
          <AccountBtn
            size={4}
            textSize={4}
            circleRadius={5}
            onPress={() => pushFollowers('followers', I18n.t('followers'))}
            name="user-following"
            type="simple-line"
            title={I18n.t('followers')}
          />
          <AccountBtn
            size={4}
            textSize={4}
            circleRadius={5}
            onPress={() => pushFollowers('followings', I18n.t('followings'))}
            name="user-following"
            type="simple-line"
            title={I18n.t('followings')}
          />
        </>
      )}
    </WhiteView>
  );
};

export default UserBtns;
