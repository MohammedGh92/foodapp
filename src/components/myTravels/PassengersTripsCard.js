import React, {useCallback} from 'react';
import {AppNavigation, AppText, AppView, TouchableView} from '../../common';
import TripContent from './TripContent';
import TripDetailsBtn from './TripDetailsBtn';
import I18n from 'react-native-i18n';
import CancelBtn from '../CancelBtn';

import {TripsRepo} from '../../repo';
const tripsRepo = new TripsRepo();

import {refreshTravelsList} from '../../utils/List';
import usePost from '../usePost';
import ReportButton from '../ReportButton';
const PassengersTripsCard = ({trip_id: id, event_name, ...data}) => {
  const cancel = useCallback(() => {
    return tripsRepo.cancelJoin(id);
  }, [id]);
  const {isLoading: isCanceling, post: onCancel} = usePost(
    cancel,
    refreshTravelsList,
  );

  return (
    <AppView
      padding={5}
      borderRadius={10}
      backgroundColor="white"
      stretch
      elevation={1}
      margin={5}>
      <AppView
        borderColor="grey"
        marginBottom={3}
        paddingVertical={3}
        stretch
        row
        spaceBetween
        borderBottomWidth={0.5}>
        {id && (
          <AppText marginTop={5} color="secondary" size={6}>{`${I18n.t(
            'trip-num',
          )}:${id}`}</AppText>
        )}
        <AppText>{data?.status?.name}</AppText>
        <ReportButton trip_id={id} user_id={data.participant.id} />
      </AppView>
      <TripContent {...data} />
      <AppView row>
        <AppText marginTop={5} color="secondary" size={7}>
          {event_name}
        </AppText>
      </AppView>
      <AppView marginVertical={5} stretch row spaceBetween>
        <TripDetailsBtn trip_id={id} />
        <CancelBtn
          onPress={onCancel}
          processing={isCanceling}
          title={I18n.t('cancel-join-request')}
        />
      </AppView>
    </AppView>
  );
};

export default PassengersTripsCard;
