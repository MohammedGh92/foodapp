import React from 'react';
import { AppImage,AppSwiper } from '../../common';
const CustomAppSwiper = (props) => {
  return (
     <AppSwiper
          autoplay
          height={35}
          width={100}
          backgroundColor="#fff"
          indicatorColor='darkgrey'
          indicatorActiveColor='silver'
        >
          {props.images.map((item, index) => {
            return (
              <AppImage
                key={item}
                // source={item ? {uri:item} : require('../../assets/imgs/MaskGroup14.png')}
                source={require('../../assets/imgs/MaskGroup14.png')}
                resizeMode="stretch"
                width={100}
                elevation={5}
                flex
              />
            );
          })}
        </AppSwiper>
  );
};

export default CustomAppSwiper;