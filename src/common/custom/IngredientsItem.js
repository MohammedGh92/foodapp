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
      margin={8} height={23} width={28}>

      <MaskedView
        maskElement={
          <AppView center borderRadius={100} backgroundColor='white'
            height={15} width={28} />
        }
      >
        <AppImage center backgroundColor='white'
          height={15} width={30} resizeMode='cover'
          source={{ uri: item[0].photo_url }}>
        </AppImage>
      </MaskedView>

      <AppText marginTop={2} size={6} center bold color='#484848'>{item[0].name}</AppText>
      <AppText margin={2} size={6} center color='gray'>  {item[1]}</AppText>
    </TouchableView>

  );
};

export default IngredientsItem;
