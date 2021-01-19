import React,{useEffect} from 'react';
import { AppView, RecipeItem, AppImage } from '../../common';
import { FlatList } from 'react-native';
import { CustomHeader } from '../../components';
import { getRecipes, getCategoryName } from '../../data/MockDataAPI';


const Recipes = (props) => {
  const {
    item
  } = props;

useEffect(() => {
    console.log('item:'+JSON.stringify(item));
  }, []);

{/* <AppImage width={100} height={100} style={{ position: 'absolute' }} source={require('../../assets/imgs/Samples/home.png')} /> */}
  return (
    <AppView flex centerX>
      <CustomHeader showMenu centerTitle title={item.name} />
      <FlatList
        data={getRecipes(item.id)}
        renderItem={(data) => <RecipeItem marginHorizontal={7} key={data.item.id}
          item={data.item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ width: '110%', margin: '2%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </AppView>
  );
};

export default Recipes;