import React from 'react';
import {AppIcon, AppText, TouchableView} from '../common';

const TagItem = ({backgroundColor, icon, onPress, title}) => {
  return (
    <TouchableView
      onPress={onPress}
      borderRadius={20}
      backgroundColor={backgroundColor}
      row
      paddingHorizontal={3}
      paddingVertical={1.5}>
      {icon && (
        <AppIcon
          marginHorizontal={2}
          name="location-sharp"
          type="ion"
          color="white"
        />
      )}

      <AppText marginHorizontal={2} color="white">
        {title}
      </AppText>
    </TouchableView>
  );
};

TagItem.defaultProps = {
  icon: true,
};
export default TagItem;
