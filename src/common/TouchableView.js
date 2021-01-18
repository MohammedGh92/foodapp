import React, {useMemo} from 'react';
import {View as RNView, TouchableOpacity} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import useTouchableViewStyles from './utils/useTouchableViewStyles';
import useBtnStyles from './utils/useBtnStyles';

const TouchableView = props => {
  const {onLayout, style, onPress, touchableOpacity, children, ...rest} = props;

  const Container = touchableOpacity ? TouchableOpacity : RectButton;

  const touchableStyles = useTouchableViewStyles(rest);
  const btnStyles = useBtnStyles(rest);
  return useMemo(() => {
    return (
      <RNView onLayout={onLayout} style={[touchableStyles, style]}>
        <Container {...{onPress}} style={btnStyles}>
          {children}
        </Container>
      </RNView>
    );
  }, [onLayout, touchableStyles, style, onPress, btnStyles, children]);
};

export default TouchableView;
