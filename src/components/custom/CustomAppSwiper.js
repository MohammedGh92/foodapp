import React from 'react';
import { AppImage,AppSwiper } from '../../common';
const CustomAppSwiper = (props) => {
  return (
     <AppSwiper
          autoplay
          height={37.5}
          width={100}
          backgroundColor="#fff"
          indicatorColor='#dedede'
          indicatorActiveColor='white'
        >
          {props.images.map((item, index) => {
            return (
              <AppImage
                key={item}
                source={{uri:item}}
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