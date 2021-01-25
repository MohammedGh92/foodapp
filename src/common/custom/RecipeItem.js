import React, { useCallback, useEffect } from 'react';
import { AppText, AppImage, TouchableView, AppNavigation, AppView } from '..';

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
      margin={3} elevation={3} borderRadius={20} height={21} width={40}>
      <AppImage center borderRadius={20} backgroundColor='white'
        height={21} width={40} style={{ position: 'absolute' }}
        source={{ uri: item.photo_url }} />
      <AppView width={40} height={4.5} borderRadius={20} style={{
        opacity: 0.25, position: 'absolute',
        bottom: 0
      }} backgroundColor='black' />
      <AppText marginTop={52.5} numberOfLines={1} size={6} center bold color='white'>  {item.title}</AppText>
    </TouchableView>
  );
};

export default RecipeItem;
