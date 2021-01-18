import React from 'react';
import {AppIcon, AppText, AppView, TouchableView} from '../common';

const AccountBtn = ({
  name,
  type,
  circleRadius,
  iconStyle,
  size,
  onPress,
  textSize,
  title,
}) => {
  return (
    <TouchableView center {...{onPress}} margin={5}>
      <AppView circleRadius={circleRadius} center backgroundColor="foreground">
        <AppIcon
          style={iconStyle}
          {...{name}}
          {...{type}}
          size={size}
          color="white"
        />
      </AppView>
      <AppText size={textSize} marginVertical={2} color="secondary">
        {title}
      </AppText>
    </TouchableView>
  );
};

AccountBtn.defaultProps = {
  size: 10,
  textSize: 5,
  circleRadius: 12,
};
export default AccountBtn;
