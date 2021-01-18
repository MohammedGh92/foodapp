import React, {useCallback, useContext, useState} from 'react';
import ActionItem from './ActionItem';
import I18n from 'react-native-i18n';
import store from '../../store/store';
import EventCardContext from '../../contexts/EventCardContext';
import {useSelector} from 'react-redux';
import {AppIcon, AppNavigation, AppText, TouchableView} from '../../common';
const JoinTrip = (props) => {
  // const user = useSelector((state) => state.auth.userData.user);
  const cardData = useContext(EventCardContext);
  // const [isJoined, setIsJoined] = useState(
  //   cardData.participants.findIndex((val) => val.id === user.id) >= 0,
  // );
  // const joinEvent = useCallback(async () => {
  //   if (isJoined) {
  //     return;
  //   }
  //   const res = await eventsRepo.joinEvent(cardData.event_id);
  //   if (res) {
  //     setIsJoined(true);
  //     cardData.setParticipants([...cardData.participants, user]);
  //   }
  // }, [cardData, eventsRepo, isJoined, user]);

  return (
    <TouchableView
      touchableOpacity={props.touchableOpacity}
      row
      onPress={() =>
        AppNavigation.push({
          name: 'eventTrips',
          passProps: {
            event_id: cardData.event_id,
          },
        })
      }
      height={5}
      marginHorizontal={8}
      {...props}>
      <AppIcon color={'grey'} name="share-2" type="feather" size={10} />

      <AppText size={6} color="secondary" marginHorizontal={2}>
        {I18n.t('join-trip')}
      </AppText>
    </TouchableView>
  );
};

export default JoinTrip;
