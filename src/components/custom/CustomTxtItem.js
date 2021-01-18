import React from 'react';
import { AppView, AppText } from '../../common';
const CustomTxtItem = (props) => {

  const {
    title, value, backgroundColor,borderWidth,borderBottomWidth
  } = props;

  return (
    <AppView center height={5} width={90} borderBottomWidth={borderBottomWidth?borderBottomWidth:0} backgroundColor={ backgroundColor?backgroundColor:'transparent'}>
      <AppView spaceBetween row width={65}>
        <AppText size={6} color='black'>  {title} </AppText>
        <AppText size={6} color='#32C9B9'>  {value} </AppText>
      </AppView>
    </AppView>
  );
};

export default CustomTxtItem;
