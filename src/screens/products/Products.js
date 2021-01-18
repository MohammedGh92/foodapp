import React, { useEffect } from 'react';
import { AppView, ProdItem } from '../../common';
import { FlatList } from 'react-native';
import { CustomHeader } from '../../components';
import ProductsData from '../../data/ProductsData.json';

const Products = ({ data }) => {
  useEffect(() => {
  }, []);

  return (
    <AppView flex centerX backgroundColor='#E9E9EF'>
      <CustomHeader title='Products' />
      <FlatList
        data={ProductsData.data.dataarr}
        renderItem={(data) => <ProdItem marginHorizontal={7} key={data.item.id} item={data.item} NavMenu={'productdetails'} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ width: '100%' }}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </AppView>
  );
};

export default Products;