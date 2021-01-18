import React from 'react';
import {TouchableView, AppIcon} from '../common';

const SocialBtn = ({name, type, color, size, backgroundColor, onPress}) => {
  return (
    <TouchableView
      {...{onPress}}
      margin={5}
      circleRadius={11}
      {...{backgroundColor}}
      center>
      <AppIcon {...{name}} {...{type}} {...{color}} {...{size}} />
    </TouchableView>
  );
};

export default SocialBtn;
