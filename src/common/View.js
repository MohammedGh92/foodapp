import React, {useMemo} from 'react';
import {View as RNView} from 'react-native';

import useCommonStyles from './utils/useCommonStyles';
import useViewStyles from './utils/useViewStyles';

const View = ({onLayout, style, children, ...rest}) => {
  const commonStyles = useCommonStyles(rest);
  const viewStyles = useViewStyles(rest);
  return useMemo(() => {
    return (
      <RNView {...{onLayout}} style={[commonStyles, viewStyles, style]}>
        {children}
      </RNView>
    );
  }, [onLayout, commonStyles, viewStyles, style, children]);
};

export default View;
