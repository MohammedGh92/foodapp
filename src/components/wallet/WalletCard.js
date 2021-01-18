import React from 'react';
import {AppText, AppView, TouchableView} from '../../common';
import I18n from 'react-native-i18n';
import {useSelector} from 'react-redux';
import {event} from 'react-native-reanimated';
const WalletCard = ({...data}) => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <AppView
      padding={5}
      borderRadius={10}
      backgroundColor="white"
      stretch
      elevation={1}
      marginHorizontal={5}
      marginBottom={5}>
      <AppView
        borderColor="grey"
        marginBottom={3}
        paddingBottom={3}
        stretch
        row
        spaceBetween
        borderBottomWidth={0.5}>
        <AppView row stretch center marginTop={2}>
          <AppText color="#E24B4B" size={7} bold>
            {data.price.toFixed(2)}
          </AppText>
          <AppText color="#ACABB4" marginHorizontal={2}>
            {I18n.t('sar')}
          </AppText>
        </AppView>
        <AppText color="#ACABB4">{data.trip_date}</AppText>
      </AppView>
      <AppView stretch row spaceBetween>
        <AppText color="secondary" size={6.5} bold>
          {data.event.name}
        </AppText>
        <AppText color="#ACABB4">
          البنك المتحد
          {/* TODO Make it dynamic from data */}
        </AppText>
      </AppView>
    </AppView>
  );
};

export default WalletCard;
