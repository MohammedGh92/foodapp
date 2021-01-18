import React, {useMemo} from 'react';
import {Platform, Dimensions} from 'react-native';
import NativeModal from 'react-native-modal';

const height = Dimensions.get('screen').height;

const Modal = ({
  closeable,
  lock,
  children,
  changeState,
  backdropDissmiss,
  ...rest
}) => {
  const memoizedStyles = useMemo(() => {
    return {
      margin: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height,
    };
  }, []);
  return (
    <NativeModal
      backdropOpacity={0.8}
      {...rest}
      hardwareAccelerated
      hideModalContentWhileAnimating
      onRequestClose={() => {
        changeState(lock || !closeable);
      }}
      useNativeDriver
      onBackdropPress={() => {
        if (Platform.OS === 'ios' || backdropDissmiss) {
          changeState(lock || !closeable);
        }
      }}
      deviceHeight={height}
      onBackButtonPress={() => changeState(lock || !closeable)}
      style={memoizedStyles}>
      {children}
    </NativeModal>
  );
};

Modal.defaultProps = {
  closeable: true,
};

export default Modal;
