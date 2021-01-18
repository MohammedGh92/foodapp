import React, {useMemo} from 'react';
import {View as RNView} from 'react-native';

import useCommonStyles from './utils/useCommonStyles';
import useViewStyles from './utils/useViewStyles';

import Animated from 'react-native-reanimated';

const AniamtedView = ({onLayout, style, children, ...rest}) => {
  const commonStyles = useCommonStyles(rest);
  const viewStyles = useViewStyles(rest);
  return useMemo(() => {
    return (
      <Animated.View
        {...{onLayout}}
        style={[commonStyles, viewStyles, style]}
        {...rest}>
        {children}
      </Animated.View>
    );
  }, [onLayout, commonStyles, viewStyles, rest, style, children]);
};

export default AniamtedView;
