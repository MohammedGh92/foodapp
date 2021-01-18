import React, {useCallback, useState} from 'react';

import I18n from 'react-native-i18n';
import {AppNavigation} from '../../common';
import useFetch from '../useFetch';
import LoadingView from '../LoadingView';
import {UsersRepo} from '../../repo';
import AccountBtn from '../AccountBtn';
import WhiteView from '../myAccount/WhiteView';
const usersRepo = new UsersRepo();
const UserBtns = ({userId}) => {
  const getProfileData = useCallback(async () => {
    return await usersRepo.getProfileData(userId);
  }, [userId]);
  const {isLoading, data} = useFetch(getProfileData);
  const push = useCallback(
    (name) => {
      AppNavigation.push({
        name,
        passProps: {
          data,
          isEditable: false,
        },
      });
    },
    [data],
  );
  const pushUserData = useCallback(() => {
    push('myData');
  }, [push]);
  const pushPrefrences = useCallback(() => {
    push('prefrences');
  }, [push]);

  const pushcarData = useCallback(() => {
    push('carData');
  }, [push]);

  console.log(data);
  return (
    <WhiteView
      marginHorizontal={5}
      marginVertical={5}
      height={14}
      row
      spaceBetween
      paddingHorizontal={5}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <>
          <AccountBtn
            onPress={pushUserData}
            size={8}
            name="user"
            type="font-awesome5"
            title={I18n.t('my-data')}
          />
          <AccountBtn
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
            onPress={pushcarData}
            name="ios-car-outline"
            type="ion"
            title={I18n.t('car-data')}
          />
        </>
      )}
    </WhiteView>
  );
};

export default UserBtns;
