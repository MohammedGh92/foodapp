import React, {forwardRef, useCallback} from 'react';
import {AppModal, AppView, AppScrollView} from '../common';
import useModal from './useModal';

export default forwardRef(({invoice, ...rest}, ref) => {
  const [isVisible, changeState, hide] = useModal(ref);

  const renderContent = useCallback(() => {
    return (
      <AppView
        height={70}
        paddingHorizontal={10}
        backgroundColor="white"
        width={90}
        borderRadius={10}>
        <AppScrollView stretch flexGrow />
      </AppView>
    );
  }, []);

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
