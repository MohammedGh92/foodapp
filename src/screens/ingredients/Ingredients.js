import React, { useEffect } from 'react';
import { AppView, IngredientsItem, AppImage } from '../../common';
import { FlatList } from 'react-native';
import { CustomHeader } from '../../components';
import ProductsData from '../../data/ProductsData.json';
import SplashScreen from 'react-native-splash-screen';
import { getIngredientName, getAllIngredients } from '../../data/MockDataAPI';


const Ingredients = (props) => {
  const {
    item
  } = props;



  return (
    <AppView flex centerX>
      {false && <AppImage width={100} height={100} style={{ position: 'absolute' }}
        source={require('../../assets/imgs/Samples/ingredients.png')} />}
      <CustomHeader centerTitle title='Ingredients' />
      {
        <FlatList
          data={getAllIngredients(item.ingredients)}
          renderItem={(data) => <IngredientsItem key={data.item.id}
            item={data.item} />}
          keyExtractor={(item) => item.id}
          numColumns={3}
          style={{ width: '103%', margin: '2%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      }
    </AppView>
  );
};

export default Ingredients;