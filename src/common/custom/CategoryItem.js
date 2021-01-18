import React, { useCallback, useEffect } from 'react';
import { AppText, AppView, AppImage, TouchableView, AppNavigation } from '..';

const CategoryItem = (props) => {
  const {
    item,
    NavMenu
  } = props;

  useEffect(() => {
  }, []);

  const OnClick = useCallback(() => {

    AppNavigation.push({
      name: NavMenu,
      passProps: {
        data: item,
      },
    })
  }, []);

  return (
    <TouchableView onPress={OnClick}>
      <AppView marginHorizontal={props.marginHorizontal}
        margin={4} elevation={3} resizeMode="stretch" height={24} width={42}>
        <AppImage center resizeMode="stretch" height={13} margin={3} width={26}
          source={{ uri: item.photo_url }}>
        </AppImage>
        <AppText size={5} color='darkgrey'>  {item.name}</AppText>
      </AppView>
    </TouchableView>
  );
};

export default CategoryItem;
