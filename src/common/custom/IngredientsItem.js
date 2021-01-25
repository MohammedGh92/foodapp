import React, { useCallback, useEffect } from 'react';
import { AppText, AppView, AppImage, TouchableView, AppNavigation } from '..';
import MaskedView from '@react-native-masked-view/masked-view';

const IngredientsItem = (props) => {
  const {
    item
  } = props;


  const OnClick = useCallback(() => {


    AppNavigation.push({
      name: 'RecipesByIngredients',
      passProps: {
        item: item,
      },
    })
  }, []);

  return (
    <TouchableView onPress={OnClick} marginHorizontal={3}
      margin={8} height={15} width={28}>

      <MaskedView
        maskElement={
          <AppView center borderRadius={20} backgroundColor='white'
            height={15} width={28} />
        }
      >
        <AppImage center backgroundColor='white'
          height={15} width={30} resizeMode='cover'
          source={{ uri: item[0].photo_url }}>
          <AppView style={{ position: 'absolute', opacity: 0.35, bottom: 0 }} backgroundColor='black'
            width={30} height={4}></AppView>
          <AppView width={20} center marginTop={32.5}>
            <AppText size={3.5} center bold color='white'>{item[0].name}</AppText>
            <AppText size={3.75} center color='white'>{item[1]}</AppText>
          </AppView>
        </AppImage>
      </MaskedView>
    </TouchableView>

  );
};

export default IngredientsItem;
