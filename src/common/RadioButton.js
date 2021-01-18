import React from 'react';

import View from './View';
import Text from './Text';
import Icon from './Icon';
import {getTheme} from './Theme';
import {RADIO_BUTTON_DISPLAY_NAME} from './utils/Constants';
import Button from './Button';
import TouchableView from './TouchableView';
// TODO: Add custom button (for different radio shapes)
// TODO: REFACTOR
const RadioButton = (props) => {
  const {
    selected,
    size,
    value,
    index,
    onPress,
    label,
    labelSize,
    labelColor,
    touchableOpacity,
    labelBold,
    icon,
    name,
    type,
    activeColor,
    normalColor,
    ...rest
  } = props;

  return (
    <TouchableView
      touchableOpacity={touchableOpacity}
      onPress={() => {
        onPress(value, index);
      }}
      row
      {...rest}
      marginLeft={5}>
      <View
        row
        circleRadius={size}
        borderColor={selected ? activeColor : normalColor}
        borderWidth={1.5}
        center>
        {selected && (
          <View
            circle
            circleRadius={size * 0.7}
            backgroundColor={activeColor}
          />
        )}
      </View>
      {label && (
        <Text
          bold={selected}
          size={labelSize || size}
          color={labelColor}
          centerY
          marginHorizontal={5}>
          {label}
        </Text>
      )}
    </TouchableView>
  );
};
RadioButton.displayName = RADIO_BUTTON_DISPLAY_NAME;
RadioButton.defaultProps = {
  selected: false,
  size: getTheme().radioButton.size,
  activeColor: getTheme().radioButton.activeColor,
  normalColor: getTheme().radioButton.normalColor,
  labelColor: getTheme().radioButton.labelColor,
  labelBold: false,
  onPress: () => {},
};
export default RadioButton;
