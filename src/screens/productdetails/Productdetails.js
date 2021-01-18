import React, { useState, useCallback } from 'react';
import { AppView, AppScrollView, AppButton } from '../../common';
import { CustomHeader, CustomTabs, OverViewTab, FeaturesTab, CustomAppSwiper, RatingTab } from '../../components';
import TabsContext from '../../contexts/TabsContext';
import ProductDetailsData from '../../data/ProductDetailsData.json';

const Productdetails = () => {
  const [selected, setSelected] = useState(1);

  const AddToCartBTN = useCallback(async () => {

    console.log('AddToCartBTN');

  }, []);

  return (
    <AppView flex backgroundColor='#E9E9EF'>
      <CustomHeader title='Product Details' />
      <AppScrollView centerX flexGrow>

        <CustomAppSwiper images={ProductDetailsData.data.images} />

        <AppView backgroundColor='white' marginVertical={-5} marginBottom={0.1} width={90}>
          <TabsContext.Provider value={{ selected, setSelected }}>
            <CustomTabs Titles={['Overview', 'Features', 'Rating']} />
          </TabsContext.Provider>
        </AppView>
        {selected == 1 && <OverViewTab data={ProductDetailsData.data} />}
        {selected == 2 && <FeaturesTab data={ProductDetailsData.data} />}
        {selected == 3 && <RatingTab data={ProductDetailsData.data.reviews} />}
      </AppScrollView>
      <AppButton
        onPress={AddToCartBTN}
        title={'Add to cart'}
        stretch
        backgroundColor='#4ED7C8'
        size={9}
        touchableOpacity
      />
    </AppView>
  );
};

export default Productdetails;