import React from 'react';
import {AppButton} from '../common';
import Themes from './Themes';

const ActiveBtn = (props) => {
  return <AppButton {...props} />;
};
ActiveBtn.defaultProps = {
  ...Themes.activeBn,
};

export default ActiveBtn;
