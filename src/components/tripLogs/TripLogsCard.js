import React from 'react';
import {AppNavigation, AppText, AppView, TouchableView} from '../../common';
import TagItem from '../TagItem';
import I18n from 'react-native-i18n';
import {useSelector} from 'react-redux';
const TripLogsCard = ({...data}) => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <TouchableView
      padding={5}
      borderRadius={10}
      backgroundColor="white"
      stretch
      elevation={1}
      margin={5}
      onPress={() =>
        AppNavigation.push({
          name: 'tripDetails',
          passProps: {
            trip_id: data.id,
          },
        })
      }>
      <AppText marginTop={5} color="secondary" size={6}>{`${I18n.t(
        'trip-num',
      )} :${data.id}`}</AppText>
      <AppView
        borderColor="grey"
        marginBottom={3}
        paddingVertical={3}
        stretch
        row
        spaceBetween
        borderBottomWidth={0.5}>
        <AppText>{data.status.name}</AppText>
        <AppText>{data.trip_date}</AppText>
      </AppView>
      <AppView stretch>
        <AppView stretch row spaceBetween>
          {data.city && (
            <TagItem
              backgroundColor="foreground"
              title={data.city ? data.city.name : ''}
            />
          )}
          {data.status && (
            <TagItem
              backgroundColor={data.status.id !== 1 ? 'primary' : 'secondary'}
              icon={false}
              title={data.status.name}
            />
          )}
        </AppView>
        <AppView stretch spaceBetween row>
          {data.event && (
            <AppText
              numberOfLines={2}
              size={7}
              marginVertical={5}
              color="secondary">
              {data.event.name}
            </AppText>
          )}
          {data.user && (
            <TagItem
              backgroundColor="secondary"
              icon={false}
              title={
                data.user.id === userData.user.id
                  ? I18n.t('driver')
                  : I18n.t('passenger')
              }
            />
          )}
        </AppView>
      </AppView>
    </TouchableView>
  );
};

export default TripLogsCard;
