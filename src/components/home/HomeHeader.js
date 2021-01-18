import React from 'react';

import {
  AppView,
  AppNavigation,
  AppButton,
  AppIcon,
  AppImage,
} from '../../common';
import {APPBAR_HEIGHT} from '../../common/utils/responsiveDimensions';
const centImg = require('../../assets/imgs/homeCenterBg.png');
const HomeHeader = (props) => {
  const {color} = props;

  const renderRight = () => {
    return (
      <AppButton flex transparent onPress={() => AppNavigation.push('test')}>
        <AppIcon {...{color}} name="heart" type="font-awesome" size={10} />
      </AppButton>
    );
  };

  const renderLeft = () => {
    return (
      <AppButton flex onPress={() => AppNavigation.push('menu')} transparent>
        <AppIcon {...{color}} name="menu" type="feather" size={12} />
      </AppButton>
    );
  };

  const renderCenter = () => {
    return (
      <AppView center flex={6}>
        <AppImage resizeMode="contain" height={7} source={centImg} width={20} />
      </AppView>
    );
  };
  const Container = AppView;
  return (
    <Container
      center
      stretch
      style={{
        height: APPBAR_HEIGHT,
      }}
      row
      spaceBetween>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </Container>
  );
};

HomeHeader.defaultProps = {
  color: 'white',
};
export default HomeHeader;
