import React from 'react';
import {AppIcon, AppImage, AppText, AppView, responsiveWidth} from '../common';

const EventItem = ({name, image, type, value, size}) => {
  return (
    <AppView marginVertical={4} stretch row>
      <AppView center circleRadius={9} backgroundColor="foreground">
        {!image ? (
          <AppIcon size={size || 10} {...{name}} {...{type}} color="white" />
        ) : (
          <AppImage source={{uri: image}} />
        )}
      </AppView>
      <AppView style={{maxWidth: responsiveWidth(80)}}>
        <AppText marginHorizontal={3}>{value}</AppText>
      </AppView>
    </AppView>
  );
};
EventItem.defaultProps = {
  image: false,
};

export default EventItem;
