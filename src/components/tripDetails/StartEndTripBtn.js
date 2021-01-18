import React, {useCallback, useRef, useState} from 'react';
import {AppButton, showError} from '../../common';
import I18n from 'react-native-i18n';
import {TripsRepo} from '../../repo';
import usePost from '../usePost';
import moment from 'moment';
import EvaluationModal from '../EvaluationModal';
const tripsRepo = new TripsRepo();
const StartEndTripBtn = ({
  trip_id,
  isTripStarted,
  setIstripStarted,
  evaluees,
}) => {
  const evalationModalRef = useRef();

  const showEvalModal = useCallback(() => evalationModalRef.current.show(), []);

  const startTrip = useCallback(async () => {
    // if (
    //   moment(trip_date + ' ' + beginning_time).diff(new Date(), 'seconds') > 0
    // ) {
    //   showError(I18n.t('start-time-not-come'));
    //   return;
    // }

    const res = await tripsRepo.startTrip(trip_id);
    if (res) {
      setIstripStarted(true);
    }
    return res;
  }, [trip_id, setIstripStarted]);
  const {isLoading: isStarting, post: onStart} = usePost(startTrip);

  const finishTrip = useCallback(async () => {
    const res = await tripsRepo.finishTrip(trip_id);
    return res;
  }, [trip_id]);
  const {isLoading: isFinishing, post: onFinish} = usePost(
    finishTrip,
    evaluees.length > 0 ? showEvalModal : () => {},
  );

  return (
    <>
      {isTripStarted ? (
        <AppButton
          onPress={onFinish}
          processing={isFinishing}
          stretch
          marginHorizontal={10}
          marginBottom={5}
          title={I18n.t('finish-trip')}
        />
      ) : (
        <AppButton
          onPress={onStart}
          processing={isStarting}
          stretch
          marginHorizontal={10}
          marginBottom={5}
          title={I18n.t('start-trip')}
        />
      )}
      <EvaluationModal {...{evaluees}} ref={evalationModalRef} {...{trip_id}} />
    </>
  );
};

export default StartEndTripBtn;
