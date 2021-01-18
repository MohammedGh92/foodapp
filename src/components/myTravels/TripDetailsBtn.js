import React from 'react';
import ActiveBtn from '../ActiveBtn';
import I18n from 'react-native-i18n';
import {AppNavigation} from '../../common';
const TripDetailsBtn = ({trip_id}) => {
  return (
    <ActiveBtn
      onPress={() =>
        AppNavigation.push({
          name: 'tripDetails',
          passProps: {
            trip_id,
          },
        })
      }
      title={I18n.t('details')}
    />
  );
};

export default TripDetailsBtn;
