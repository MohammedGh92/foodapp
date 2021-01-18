import React from 'react';
import { AppView, AppText } from '../../common';
const CustomAppReview = (props) => {

const {rating,text} = props.item;

  return (
    <AppView width={90} border={1} borderBottomWidth={0.5} height={13} row >
      <AppText size={10} center color='black'>  {rating}</AppText>
      <AppView centerY marginHorizontal={5} width={70} height={10}>
        <AppText size={5} left color='darkgrey' height={50}>{text}</AppText>
      </AppView>
    </AppView>

  );
};

export default CustomAppReview;
