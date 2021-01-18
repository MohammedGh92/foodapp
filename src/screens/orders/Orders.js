import React, { useEffect } from 'react';
import { AppView, OrderItem } from '../../common';
import { FlatList } from 'react-native';
import { CustomHeader } from '../../components';
import OrdersData from '../../data/OrdersData.json';

const Products = ({ data }) => {
  useEffect(() => {
  }, []);

  return (
    <AppView flex centerX backgroundColor='#E9E9EF'>
      <CustomHeader title='Orders' />
      <FlatList
        data={OrdersData.data.dataarr}
        renderItem={(data) => <OrderItem key={data.item.id} item={data.item} />}
        keyExtractor={(item) => item.id}
        numColumns={1}
        style={{ width: '100%' }}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </AppView>
  );
};

export default Products;