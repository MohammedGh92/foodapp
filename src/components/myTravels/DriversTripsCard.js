import React, {useCallback, useRef} from 'react';
import {AppText, AppView, TouchableView} from '../../common';
import TripContent from './TripContent';
import TripDetailsBtn from './TripDetailsBtn';
import I18n from 'react-native-i18n';
import CancelTripModal from '../CancelTripModal';
import CancelBtn from '../CancelBtn';
import {refreshTravelsList} from '../../utils/List';
const DriversTripsCard = ({event_name, id, ...data}) => {
  const cancelTripModalRef = useRef();
  const showCancelModal = useCallback(
    () => cancelTripModalRef.current.show(),
    [],
  );
  return (
    <TouchableView
      padding={5}
      borderRadius={10}
      backgroundColor="white"
      stretch
      elevation={1}
      margin={5}>
      <TripContent {...data} tripStatus={data.status} address={event_name} />
      {id && (
        <AppText marginTop={5} color="secondary" size={6}>{`${I18n.t(
          'trip-num',
        )}:${id}`}</AppText>
      )}
      <AppView marginVertical={5} stretch row spaceBetween>
        <TripDetailsBtn trip_id={id} />
        <CancelBtn title={I18n.t('cancel-trip')} onPress={showCancelModal} />
      </AppView>
      <CancelTripModal
        trip_id={id}
        onSuccess={refreshTravelsList}
        ref={cancelTripModalRef}
      />
    </TouchableView>
  );
};

export default DriversTripsCard;
