import React, {useCallback, useRef} from 'react';
import {AppButton, AppNavigation} from '../../common';
import I18n from 'react-native-i18n';
import CancelTripModal from '../CancelTripModal';
const CancelTripBtn = ({trip_id}) => {
  const cancelTripModalRef = useRef();
  const showCancelModal = useCallback(
    () => cancelTripModalRef.current.show(),
    [],
  );

  return (
    <>
      <AppButton
        onPress={showCancelModal}
        stretch
        backgroundColor="danger"
        marginHorizontal={10}
        marginBottom={5}
        title={I18n.t('cancel-trip')}
      />

      <CancelTripModal
        onSuccess={AppNavigation.navigateToHome}
        ref={cancelTripModalRef}
        {...{trip_id}}
      />
    </>
  );
};

export default CancelTripBtn;
