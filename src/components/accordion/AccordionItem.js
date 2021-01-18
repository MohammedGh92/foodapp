import React from 'react';

import {AppAniamtedView} from '../../common';
import {bInterpolate} from 'react-native-redash';

export default ({content, transition, listHeight}) => {
  const height = bInterpolate(transition, 0, listHeight);
  return (
    <>
      <AppAniamtedView stretch overflow="hidden" style={{height}}>
        {content}
      </AppAniamtedView>
    </>
  );
};
