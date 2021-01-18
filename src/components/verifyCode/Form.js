import React, {useState, useEffect} from 'react';
import OTPInputView from '../../components/@twotalltotems/react-native-otp-input';
import {StyleSheet} from 'react-native';
import {
  moderateScale,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../common/utils/responsiveDimensions';
const Form = forwardRef( (props) => {
  useEffect(() => {
    ref.current = {show, hide};
  }, [hide, ref, show]);

  return (
    <>
      <OTPInputView
        style={styles.container}
        pinCount={4}
        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={onCodeChanged}
        autoFocusOnLoad
        codeInputFieldStyle={styles.codeInputFieldStyle}
        codeInputHighlightStyle={styles.codeInputHighlightStyle}
        onCodeFilled={async (confirmationCode) => {
          props.setLoading(false);
        }}
      />
    </>
  );
};


export default Form;
