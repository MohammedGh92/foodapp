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
    <AppView flex>
      <CustomHeader centerTitle title={item[0].name} />
      <AppImage
        source={{ uri: item[0].photo_url }}
        resizeMode="stretch"
        width={100}
        elevation={2}
        height={40}
      />
      <AppText color="#090909" margin={7} bold size={8}>
        Recipes with {item[0].name} :
      </AppText>

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