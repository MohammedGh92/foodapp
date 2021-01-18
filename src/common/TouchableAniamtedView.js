import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import useTouchableViewStyles from './utils/useTouchableViewStyles';
import useBtnStyles from './utils/useBtnStyles';
import Animated from 'react-native-reanimated';

const TouchableView = (props) => {
  const {
    onLayout,
    style,
    onPress,
    touchableOpacity,
    backgroundColor,
    children,
    ...rest
  } = props;

  const Container = touchableOpacity ? TouchableOpacity : RectButton;
  const backgroundColorStyles = useMemo(() => {
    return {
      backgroundColor,
    };
  }, [backgroundColor]);
  const touchableStyles = useTouchableViewStyles(rest);
  const btnStyles = useBtnStyles(rest);
  return useMemo(() => {
    return (
      <Animated.View
        onLayout={onLayout}
        style={[touchableStyles, backgroundColorStyles, style]}>
        <Container {...{onPress}} style={btnStyles}>
          {children}
        </Container>
      </Animated.View>
    );
  }, [
    onLayout,
    touchableStyles,
    style,
    backgroundColorStyles,
    onPress,
    btnStyles,
    children,
  ]);
};

TouchableView.defualtProps = {
  touchableOpacity: false,
};
export default TouchableView;
