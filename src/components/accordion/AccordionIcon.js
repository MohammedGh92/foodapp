import React from 'react';
import {bInterpolate} from 'react-native-redash';
import {AppIcon, AppAniamtedView} from '../../common';

export default ({transition, open}) => {
  const rotateZ = bInterpolate(transition, 0, Math.PI);
  return (
    <AppAniamtedView style={{transform: [{rotateZ}]}}>
      <AppIcon name="chevron-down" type="feather" color="secondary" size={9} />
    </AppAniamtedView>
  );
};
