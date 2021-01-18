import React, { useEffect, useCallback } from 'react';
import { AppView, CartItem, AppScrollView, AppButton, AppNavigation } from '../../common';
import { CustomHeader } from '../../components';
import ProductsData from '../../data/ProductsData.json';

const Cart = () => {
  useEffect(() => {
  }, []);


  const AddToCartBTN = useCallback(async () => {
    AppNavigation.push({
      name: 'maplocation'
    })
, []});

  return (
    <AppView flex centerX backgroundColor='#E9E9EF'>
      <CustomHeader title='Cart' hideCart />
      <AppScrollView centerX height={50}>
        {
          ProductsData.data.dataarr.map((item, index) =>
            <CartItem item={item} />
          )
        }
      </AppScrollView>

      <AppButton
        onPress={AddToCartBTN}
        title={'Confirm'}
        stretch
        backgroundColor='#4ED7C8'
        size={9}
        touchableOpacity
      />

    </AppView>
  );
};

export default Cart;