import React from 'react';
import {AppView} from '../../common';

const WhiteView = ({children, ...rest}) => {
  return (
    <AppView
      stretch
      backgroundColor="white"
      borderRadius={10}
      elevation={1}
      {...rest}>
      {children}
    </AppView>
  );
};

export default WhiteView;
