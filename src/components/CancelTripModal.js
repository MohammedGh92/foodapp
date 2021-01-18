import React, {forwardRef, useCallback} from 'react';
import {AppModal, AppView, AppText, AppScrollView} from '../common';
import useModal from './useModal';
import I18n from 'react-native-i18n';
import ActiveBtn from './ActiveBtn';
import CancelBtn from './CancelBtn';
import {TripsRepo} from '../repo';
import usePost from './usePost';
const tripsRepo = new TripsRepo();

export default forwardRef(({trip_id, onSuccess, ...rest}, ref) => {
  const [isVisible, changeState, show, hide] = useModal(ref);

  const cancelTrip = useCallback(async () => {
    const res = await tripsRepo.cancelTrip(trip_id);
    if (res) {
      hide();
    }
    return res;
  }, [trip_id, hide]);
  const {isLoading: isCancelling, post: onCancel} = usePost(
    cancelTrip,
    onSuccess,
  );

  const renderContent = () => {
    return (
      <AppView
        height={36}
        padding={10}
        backgroundColor="white"
        width={90}
        borderRadius={5}>
        <AppScrollView centerX stretch flexGrow>
          <AppText bold size={8} marginVertical={5} color="secondary">
            {I18n.t('cancel-trip')}
          </AppText>
          <AppText size={7} color="secondary">
            {I18n.t('r-u-sure-to-cancel')}
          </AppText>

          <AppView stretch spaceBetween row marginTop={15}>
            <ActiveBtn
              processing={isCancelling}
              backgroundColor="danger"
              title={I18n.t('cancel-trip')}
              touchableOpacity
              onPress={onCancel}
              width={35}
            />
            <CancelBtn
              width={35}
              onPress={() => hide()}
              title={I18n.t('retreat')}
              touchableOpacity
            />
          </AppView>
        </AppScrollView>
      </AppView>
    );
  };

  return (
    <AppModal
      animationIn="bounceIn"
      animationOut="bounceOut"
      isVisible={isVisible}
      backdropDissmiss
      closeable
      {...{changeState}}
      {...rest}>
      {renderContent()}
    </AppModal>
  );
});
