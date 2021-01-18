import React, {useCallback, useRef, useState} from 'react';
import {
  AppView,
  AppImage,
  AppText,
  AppIcon,
  TouchableView,
  AppNavigation,
} from '../../common';
import {StyleSheet} from 'react-native';
import EventUsers from './EventUsers';
import EventActions from './EventActions';
import {APP_BASE_URL} from '../../api/utils/urls';
import EventCardContext from '../../contexts/EventCardContext';
import {TagItem} from '..';
import EventModal from '../EventModal';
const EventCard = ({data}) => {
  const [participants, setParticipants] = useState([
    ...data.participants.friends,
    ...data.participants.others,
  ]);
  const eventModalRef = useRef();
  const renderName = useCallback(() => {
    return (
      <AppView stretch row spaceBetween>
        <AppView width={70}>
          <AppText numberOfLines={3} size={7.5} color="white">
            {data.name}
          </AppText>
        </AppView>
        <TouchableView paddingVertical={5}>
          <AppIcon
            onPress={() => eventModalRef.current.show()}
            size={10}
            color="white"
            type="material-community"
            name="dots-vertical"
          />
        </TouchableView>
      </AppView>
    );
  }, [data.name]);
  const renderDate = useCallback(() => {
    return (
      <AppView stretch row>
        <AppIcon name="calendar" type="foundation" color="white" size={10} />
        <AppText marginHorizontal={2} size={6.5} color="white">
          {data.appointments[0].datetime}
        </AppText>
      </AppView>
    );
  }, [data.appointments]);

  const pushMap = useCallback(() => {
    AppNavigation.push({
      name: 'mapScreen',
      passProps: {
        hideConfirm: true,
        initialLocation: {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        },
      },
    });
  }, [data.latitude, data.longitude]);
  const pushDetails = useCallback(() => {
    AppNavigation.push({
      name: 'eventDetails',
      passProps: {
        event_id: data.id,
      },
    });
  }, [data.id]);

  const renderUsers = useCallback(() => {
    return <EventUsers participants={participants} />;
  }, [participants]);
  const value = {
    participants,
    setParticipants,
    event_id: data.id,
  };
  return (
    <EventCardContext.Provider value={value}>
      <TouchableView
        onPress={pushDetails}
        marginVertical={5}
        borderRadius={10}
        style={styles.container}
        stretch
        elevation={2}>
        <AppImage
          padding={5}
          source={{uri: `${APP_BASE_URL}${data.image}`}}
          stretch
          height={22}>
          <AppView style={styles.maskContainer} />
          {renderName()}
          {renderDate()}
          <AppView flex stretch bottom>
            <AppView stretch row spaceBetween>
              <TagItem
                backgroundColor="primary"
                onPress={pushMap}
                title={data.city ? data.city.name : ''}
              />
              {renderUsers()}
            </AppView>
          </AppView>
        </AppImage>
        <EventActions event_id={data.id} event_country={data.country.id} />
        <EventModal
          user_id={data.user_id}
          event_id={data.id}
          event_country={data.country.id}
          ref={eventModalRef}
        />
      </TouchableView>
    </EventCardContext.Provider>
  );
};
const styles = StyleSheet.create({
  container: {overflow: 'hidden'},
  maskContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});

export default EventCard;
