import React, {useMemo} from 'react';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import {getTheme} from './Theme';
import {responsiveWidth} from './utils/responsiveDimensions';
import {CHECK_BOX_DISPLAY_NAME} from './utils/Constants';
import TouchableView from './TouchableView';

const CheckBox = ({
  size,
  labelSize,
  labelColor,
  label,
  onPress,
  style,
  checked,
  activeColor,
  normalColor,
  value,
  index,
  labelBold,
  customActiveRenderer,
  touchableOpacity,
  borderColor,
  paddingLeft,
  ...rest
}) => {
  const color = checked ? activeColor : normalColor;
  const memoizedDimStyles = useMemo(() => {
    return {
      width: responsiveWidth(size * 0.9),
      height: responsiveWidth(size * 0.9),
    };
  }, [size]);
  return (
    <View stretch {...rest} style={style} marginRight={5}>
      <TouchableView
        {...{touchableOpacity}}
        height={6}
        row
        onPress={() => {
          onPress(value, index);
        }}>
        <View
          borderColor={color}
          borderWidth={1.5}
          center
          borderRadius={2}
          style={memoizedDimStyles}>
          {checked ? (
            customActiveRenderer ? (
              customActiveRenderer(size, color)
            ) : (
              <Icon
                name="check"
                type="entypo"
                size={size * 1.2}
                color="secondary"
              />
            )
          ) : null}
        </View>
        <Text
          paddingLeft={paddingLeft ? paddingLeft : 5}
          bold={labelBold}
          size={labelSize || size}
          color={labelColor}>
          {label}
        </Text>
      </TouchableView>
    </View>
  );
};

CheckBox.displayName = CHECK_BOX_DISPLAY_NAME;
CheckBox.defaultProps = {
  checked: false,
  ...getTheme().checkBox,
  onPress: () => {},
  labelBold: false,
};
export default CheckBox;
