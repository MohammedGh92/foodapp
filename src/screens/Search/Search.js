import React, { useState } from 'react';
import { AppView, RecipeItem, AppButton, AppIcon, AppNavigation, AppInput } from '../../common';
import { FlatList } from 'react-native';
import { recipes } from '../../data/dataArrays';

const Search = () => {

  const [ShownRecipes, setShownRecipes] = useState(recipes);

  const SearchThisRecipe = (RecipeName) => {

    if (RecipeName.length < 1) {
      setShownRecipes(recipes)
      return;
    }
    let Recipes = recipes;
    let SearchedRecipes = [];
    let SearchedRecipe = RecipeName.toLowerCase();
    Recipes.map((item) => {
      let ItemName = item.title.toLowerCase();
      if (ItemName.includes(SearchedRecipe))
        SearchedRecipes.push(item)
    }
    )
    console.log('SearchedRecipes:' + JSON.stringify(SearchedRecipes));
    setShownRecipes(SearchedRecipes)
  }

  return (
    <AppView flex centerX>
      <AppView width={100} marginTop={3} row centerX height={8} elevation={1.1}>
        <AppButton margin={3} transparent onPress={() => AppNavigation.pop()}>
          <AppIcon color={'black'} name="md-arrow-back" type="ion" size={12} />
        </AppButton>
        <AppInput onChange={txt => SearchThisRecipe(txt)} noBorder marginTop={2} backgroundColor='#EDEDED' borderRadius={20}
          leftItems={
            <AppIcon name="search1" type="ant" color="darkgrey" marginLeft={5} />
          } borderWidth={0.3} width={80} onSubmitEditing={(txt) => console.log(txt)} />
      </AppView>

      <FlatList
        data={ShownRecipes}
        renderItem={(data) => <RecipeItem marginHorizontal={7} key={data.item.recipeId}
          item={data.item} NavMenu={'recipe'} />}
        keyExtractor={(item) => item.recipeId}
        numColumns={2}
        style={{ width: '110%', margin: '2%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </AppView>
  );
};

export default Search;