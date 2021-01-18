import React, { useCallback, useEffect } from 'react';
import { AppText, AppView, AppImage, TouchableView, AppNavigation } from '..';
import { getNumberOfRecipes } from '../../data/MockDataAPI';

const CategoryItem = (props) => {
  const {
    item,
    NavMenu
  } = props;

  const OnClick = useCallback(() => {

    AppNavigation.push({
      name: NavMenu,
      passProps: {
        data: item,
      },
    })
  }, []);

  return (
    <TouchableView center onPress={OnClick} marginHorizontal={props.marginHorizontal}
      margin={3} elevation={3} borderRadius={20} height={32.5} width={90}>
      <AppImage center borderRadius={20} backgroundColor='white'
        height={23} width={90}
        source={{ uri: item.photo_url }}>
      </AppImage>
      <AppText margin={1} numberOfLines={1} size={8} center bold color='#484848'>  
{item.name}</AppText>
      <AppText margin={1} size={6} center color='black'>  {getNumberOfRecipes(item.id)} recipes</AppText>
    </TouchableView>
  );
};

export default CategoryItem;
