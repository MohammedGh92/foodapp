import React, { useEffect, useCallback,useState } from 'react';
import { AppView, CartItem, AppScrollView, AppButton, AppNavigation } from '../../common';
import { CustomHeader, CustomTxtItem } from '../../components';
import ProductsData from '../../data/ProductsData.json';

const Bill = () => {
  
  useEffect(() => {
    let Sum =0;
    ProductsData.data.dataarr.map((item, index) => (
      Sum += parseFloat(item.price)
    ))
      setSum(Sum);
  }, []);

const [Sum, setSum] = useState(0);


  const Item = (key, Value) => {
    return <CustomTxtItem title={key} value={Value} backgroundColor='white' borderBottomWidth={0.4} />
  }

  const ConfirmBTN = useCallback(async () => {
      AppNavigation.navigateToHome();
  });

  return (
    <AppView flex centerX backgroundColor='#E9E9EF'>
      <CustomHeader title='Bill' hideCart />
      <AppScrollView margin={5} centerX flexGrow>
        {
          ProductsData.data.dataarr.map((item, index) => (
            Item(item.name, item.price)
          ))
        }
        {Item('Net Total:', Sum)}
      </AppScrollView>

      <AppButton
        onPress={ConfirmBTN}
        title={'Cashout'}
        stretch
        backgroundColor='#4ED7C8'
        size={9}
        touchableOpacity
      />

    </AppView>
  );
};

export default Bill;