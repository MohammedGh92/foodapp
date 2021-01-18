import React from 'react';
import {TagItem} from '..';
import {
  AppIcon,
  AppNavigation,
  AppText,
  AppView,
  TouchableView,
} from '../../common';
import I18n from 'react-native-i18n';
const TripCard = ({
  city,
  address,
  trip_date,
  status,
  beginning_time,
  price,
  id,
}) => {
  return (
    <TouchableView
      onPress={() =>
        AppNavigation.push({
          name: 'tripDetails',
          passProps: {
            trip_id: id,
          },
        })
      }
      padding={5}
      borderRadius={10}
      backgroundColor="white"
      stretch
      elevation={1}
      margin={5}>
      <AppView stretch row spaceBetween>
        <TagItem backgroundColor="foreground" title={city ? city.name : ''} />
        <TagItem
          backgroundColor={status.id === 1 ? 'primary' : 'secondary'}
          icon={false}
          title={status.name}
        />
      </AppView>
      <AppText marginTop={5} color="secondary" size={6}>{`${I18n.t(
        'trip-num',
      )}:${id}`}</AppText>
      <AppText numberOfLines={2} size={7} marginVertical={5} color="secondary">
        {address}
      </AppText>
      <AppView stretch row spaceBetween>
        <AppView row>
          <AppIcon name="calendar" type="foundation" />
          <AppText
            marginHorizontal={2}>{`${trip_date} ${beginning_time}`}</AppText>
        </AppView>
        <AppView row>
          <AppText color="secondary" size={6}>
            {price}
          </AppText>
          <AppText marginHorizontal={1}>{I18n.t('sar')}</AppText>
        </AppView>
      </AppView>
    </TouchableView>
  );
};

export default TripCard;
