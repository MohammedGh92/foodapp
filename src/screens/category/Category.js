import React, { useEffect } from 'react';
import { AppView, CategoryItem, AppImage } from '../../common';
import { FlatList } from 'react-native';
import { CustomHeader } from '../../components';
import { categories } from '../../data/dataArrays';

const Category = () => {

{/* <AppImage width={100} height={100} style={{ position: 'absolute' }} source={require('../../assets/imgs/Samples/home.png')} /> */}
  return (
    <AppView flex centerX>
      
      <CustomHeader centerTitle title='Categories' />
      <FlatList
        data={categories}
        renderItem={(data) => <CategoryItem marginHorizontal={7} key={data.item.id}
          item={data.item} NavMenu={'productdetails'} />}
        keyExtractor={(item) => item.id}
        numColumns={1}
        style={{ width: '110%', margin: '2%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </AppView>
  );
};

export default Category;