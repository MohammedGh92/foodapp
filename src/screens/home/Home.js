import React, { useEffect } from 'react';
import { AppView, CategoryItem } from '../../common';
import { FlatList } from 'react-native';
import { CustomHeader } from '../../components';
import ProductsData from '../../data/ProductsData.json';
import { categories } from '../../data/dataArrays';


const Home = () => {
  useEffect(() => {
  }, []);

  return (
    <AppView flex centerX>
      <CustomHeader showMenu centerTitle title='Home' />
      <FlatList
        data={categories}
        renderItem={(data) => <CategoryItem marginHorizontal={7} key={data.item.id} item={data.item} NavMenu={'productdetails'} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ width: '110%',margin:'2%' }}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </AppView>
  );
};

export default Home;