import React,{useEffect} from 'react';
import { AppView, RecipeItem, AppImage } from '../../common';
import { FlatList } from 'react-native';
import { CustomHeader } from '../../components';
import { recipes } from '../../data/dataArrays';
import SplashScreen from 'react-native-splash-screen';

const Home = () => {

useEffect(() => {
SplashScreen.hide();
  }, []);

  return (
    <AppView flex centerX>
      <CustomHeader showMenu centerTitle title='Home' />
      <FlatList
        data={recipes}
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

export default Home;