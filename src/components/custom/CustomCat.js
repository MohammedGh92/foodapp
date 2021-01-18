import React, { useCallback } from 'react';
import { AppImage, AppText, AppNavigation, TouchableView } from '../../common';
import { Header } from '..';
import { getThemeColor } from '../../common/utils/colors';

const CustomCat = ({
  id,
  title,
  NavMenu,
  source
}) => {

  const OnClick = useCallback(() => {
    AppNavigation.push({
      name: NavMenu,
      passProps: {
        data: id,
      },
    })
  }, []);

  return (
    <TouchableView onPress={OnClick} resizeMode="stretch" height={28} center elevation={2} width={88} margin={2} source={source} >
      <AppImage resizeMode="stretch" height={28} right elevation={2} width={88} margin={2} source={source} >
        <AppText marginVertical={55} size={8} center padding={3} color='white' backgroundColor='#26A59A'>
          {title}
        </AppText>
      </AppImage>
    </TouchableView >
  );
};

export default CustomCat;
