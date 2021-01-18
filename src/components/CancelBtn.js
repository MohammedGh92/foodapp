import React from 'react';
import {AppButton} from '../common';
import Themes from './Themes';
const CancelBtn = (props) => {
  return <AppButton {...props} />;
};

CancelBtn.defaultProps = {
  ...Themes.activeBn,
  ...Themes.cancelBtn,
};

export default CancelBtn;
