import React, {useCallback} from 'react';
import {AppView} from '../common';
import usePost from './usePost';
import {TripsRepo} from '../repo';
import I18n from 'react-native-i18n';
import ActiveBtn from './ActiveBtn';
import CancelBtn from './CancelBtn';
import {refreshTravelsList} from '../utils/List';

const tripsRepo = new TripsRepo();
const AcceptRefuseTripBtns = ({user_id, trip_id}) => {
  const accept = useCallback(() => {
    return tripsRepo.acceptJoin(trip_id, user_id);
  }, [trip_id, user_id]);

  const reject = useCallback(() => {
    return tripsRepo.rejectJoin(trip_id, user_id);
  }, [trip_id, user_id]);
  const {isLoading: isAccepting, post: onAccept} = usePost(
    accept,
    refreshTravelsList,
  );
  const {isLoading: isRejecting, post: onReject} = usePost(
    reject,
    refreshTravelsList,
  );
  return (
    <AppView marginVertical={5} stretch row spaceBetween>
      <ActiveBtn
        title={I18n.t('acceptance')}
        processing={isAccepting}
        onPress={onAccept}
      />

      <CancelBtn
        title={I18n.t('reject')}
        processing={isRejecting}
        onPress={onReject}
      />
    </AppView>
  );
};

export default AcceptRefuseTripBtns;
