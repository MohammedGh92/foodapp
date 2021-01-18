import React, { useEffect } from 'react';
import { AppView, RecipeItem, AppImage } from '../../common';
import { FlatList } from 'react-native';
import { CustomHeader } from '../../components';
import ProductsData from '../../data/ProductsData.json';
import { recipes } from '../../data/dataArrays';


const ingredients = () => {


  return (
    <AppView flex centerX>
      {true && <AppImage width={100} height={100} style={{ position: 'absolute' }}
        source={require('../../assets/imgs/Samples/ingredients.png')} />}
      <CustomHeader showMenu centerTitle title='Home' />
      <FlatList
        data={recipes}
        renderItem={(data) => <RecipeItem marginHorizontal={7} key={data.item.id}
          item={data.item} NavMenu={'productdetails'} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ width: '110%', margin: '2%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </AppView>
  );
};

export default ingredients;