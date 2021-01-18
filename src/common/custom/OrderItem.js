import React, { useCallback, useEffect } from 'react';
import { AppText, AppView, AppImage, TouchableView, AppNavigation } from '..';

const OrderItem = (props) => {
  const {
    item
  } = props;

  useEffect(() => {
  }, []);

  return (
    <AppView>
      <AppView backgroundColor='#f7f7f7' row marginHorizontal={props.marginHorizontal}
        margin={4} elevation={3} resizeMode="stretch" height={18} width={90}>
        <AppImage center resizeMode="stretch" height={13} margin={3} width={26}
          source={item.image ? { uri: item.image } : require('../../assets/imgs/shopping-cart.png')}>
        </AppImage>
        <AppView spaceBetween centerY height={12.5}>
          <AppText size={5} color='darkgrey'>  {item.name}</AppText>
          <AppText size={5} color='darkblue'>  {item.description}</AppText>
          <AppText size={5} color='grey'>  {item.payment_way}</AppText>
          <AppText size={5} color='gold'>  {item.total}</AppText>
        </AppView>
      </AppView>
    </AppView>
  );
};

export default OrderItem;
