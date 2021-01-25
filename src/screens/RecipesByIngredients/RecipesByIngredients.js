import React, { useEffect, useCallback } from 'react';
import { AppView, AppImage, RecipeItem, AppText } from '../../common';
import { CustomHeader } from '../../components';
import {
  getIngredientUrl,
  getRecipesByIngredient,
  getCategoryName
} from '../../data/MockDataAPI';
import { FlatList } from 'react-native';

const RecipesByIngredients = (props) => {
  const {
    item
  } = props;

  return (
    <AppView center flex>
      <CustomHeader centerTitle title={'Recipes with ' + item[0].name} />
      <AppImage
        margin={10}
        source={{ uri: item[0].photo_url }}
        height={15} width={30} resizeMode='cover'
        elevation={4}
        borderRadius={100}
      />
      <FlatList
        data={getRecipesByIngredient(item[0].ingredientId)}
        renderItem={(data) => <RecipeItem marginHorizontal={7} key={data.item.id}
          item={data.item} NavMenu={'recipe'} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ alignSelf: 'center', width: '110%', margin: '2%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </AppView>
  );
};

export default RecipesByIngredients;