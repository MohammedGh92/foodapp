import React from 'react';
import {AppSpinner, AppView} from '../common';

const LoadingView = ({color}) => {
  return (
    <AppView flex stretch center>
      <AppSpinner size={15} {...{color}} />
    </AppView>
  );
};

export default LoadingView;
