import React, { useEffect,useState } from 'react';
import { AppView } from '../../common';
import { CustomHeader, CustomProdScrollView,CustomAppSwiper } from '../../components';
import CatData from '../../data/CatData.json';
import ProductsData from '../../data/ProductsData.json';

const Category = ({ data }) => {

const [images, setimages] = useState([]);

  useEffect(() => {
  }, []);

const ItemsToImages =()=>{
  let returnedImages = [];
  ProductsData.data.dataarr.map((item, index) =>
    returnedImages.push(item['image-null'])
)
return returnedImages;
}


  return (
    <AppView flex cetnerX>
      <CustomHeader title='Category' />

      <CustomAppSwiper images={ItemsToImages()}/>

      <CustomProdScrollView title='Featured Products' Data={ProductsData} NavMenu={'products'} />

      <CustomProdScrollView title='Various products' Data={ProductsData} NavMenu={'products'} />

    </AppView>
  );
};

export default Category;