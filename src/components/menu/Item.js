import React from 'react';
import {TouchableView, AppView, AppIcon, AppText} from '../../common';

const Item = ({name, type, title, onPress}) => {
  return (
    <TouchableView
      marginVertical={2}
      {...{onPress}}
      stretch
      padding={5}
      height={6}
      row
      spaceBetween>
      <AppView row>
        <AppIcon color="black" marginHorizontal={5} size={9} {...{name}} {...{type}} />
        <AppText size={7} color="black">
          {title}
        </AppText>
      </AppView>
    </TouchableView>
  );
};

export default Item;
