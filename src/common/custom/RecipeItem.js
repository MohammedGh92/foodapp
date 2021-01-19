import React, { useCallback, useEffect } from 'react';
import { AppText, AppImage, TouchableView, AppNavigation } from '..';

const RecipeItem = (props) => {
  const {
    item
  } = props;

  useEffect(() => {
  }, []);

  const OnClick = useCallback(() => {
    AppNavigation.push({
      name: 'recipe',
      passProps: {
        item: item,
      },
    })
  }, []);

  return (
    <TouchableView onPress={OnClick} marginHorizontal={props.marginHorizontal}
      margin={3} elevation={3} borderRadius={20} height={30.5} width={40}>
      <AppImage center borderRadius={20} backgroundColor='white'
        height={21} width={40}
        source={{ uri: item.photo_url }}>
      </AppImage>
      <AppText margin={2} numberOfLines={1} size={6} center bold color='#484848'>  {item.title}</AppText>
      <AppText margin={2} size={6} center color='black'>  Desserts</AppText>
    </TouchableView>
  );
};

export default RecipeItem;
