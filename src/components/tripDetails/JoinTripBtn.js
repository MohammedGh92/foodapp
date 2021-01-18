import React, {useCallback, useRef, useState} from 'react';
import {AppButton} from '../../common';
import I18n from 'react-native-i18n';
import JoinTripModal from './JoinTripModal';
import {useSelector} from 'react-redux';
const JoinTripBtn = ({
  trip_id,
  status,
  participants,
  stop_points,
  disableJoin,
  deviation_time,
}) => {
  const joinModalRef = useRef();
  const showJoinModal = useCallback(() => joinModalRef.current.show(), []);

  const [isJoined, setIsJoined] = useState(disableJoin);
  return (
    <>
      <AppButton
        disabled={isJoined || status === 'completed'}
        onPress={showJoinModal}
        stretch
        marginHorizontal={10}
        marginBottom={5}
        title={I18n.t('join-a-trip')}
      />
      <JoinTripModal
        {...{setIsJoined}}
        {...{deviation_time}}
        {...{stop_points}}
        {...{trip_id}}
        ref={joinModalRef}
      />
    </>
  );
};

export default JoinTripBtn;
