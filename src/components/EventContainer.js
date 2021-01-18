import React from 'react';
import {AppImage, AppView} from '../common';
const mapImge = require('../assets/imgs/gMap.png');

const EventContainer = ({children}) => {
  return (
    <AppView
      overflow="hidden"
      backgroundColor="white"
      stretch
      marginHorizontal={5}
      marginTop={30}
      borderTopRightRadius={10}
      borderTopLeftRadius={10}>
      <AppImage resizeMode="cover" stretch height={20} source={mapImge} />
      <AppView marginHorizontal={5} stretch>
        {children}
      </AppView>
    </AppView>
  );
};

export default EventContainer;
