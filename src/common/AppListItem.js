import React, { useCallback } from 'react';
import { AppText, AppView, AppImage, TouchableView, AppNavigation } from '.';

const AppListItem = (props) => {
  const {
    item,
    ShowOverlay,
    NavMenu
  } = props;
  const OnClick = useCallback(() => {
    AppNavigation.push({
      name:  NavMenu ,
      passProps: {
        data: item,
      },
    })
  }, []);

  return (
    <TouchableView onPress={OnClick}>
      <AppImage center resizeMode="stretch" height={15} margin={2} width={35}
        source={item.image? {uri:item.image}: require('../assets/imgs/MainCat4.jpg')}>
        {ShowOverlay && <AppView style={{ opacity: 0.35, position: 'absolute' }} backgroundColor={'black'} width={35} height={15} />}
        <AppText size={4} center color='white'>{item.name}</AppText>
      </AppImage>
    </TouchableView>
  );
};

export default AppListItem;
