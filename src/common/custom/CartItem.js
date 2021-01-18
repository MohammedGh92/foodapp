import React, { useCallback, useEffect } from 'react';
import { AppView, AppImage, AppText } from '..';
import ProductsData from '../../data/ProductsData.json';

const CartItem = (props) => {
  const {
    name,
    image,
    price,
    rate
  } = props.item;

  return (
    <AppView width={95} row height={17.5} margin={5} backgroundColor='white' elevation={2}>
      <AppImage resizeMode='contain' height={15} width={25} center margin={5}
        source={image ? { uri: image } : require('../../assets/imgs/producticon.png')}
      />
      <AppView width={60} centerY height={15}>

        <AppText size={5} color='darkgrey' >Name: {name}</AppText>
        <AppText size={5} color='darkgrey' >New: {props.item.new?'Yes':'No'}</AppText>
        <AppText size={5} color='darkgrey' >Rate: {rate}</AppText>
        <AppText size={5} color='darkgrey' >Price: {price}</AppText>

      </AppView>
    </AppView>
  );
};

export default CartItem;
