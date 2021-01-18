import React from 'react';
import { AppView, AppText, AppScrollView, ProdItem } from '../../common';
import { getThemeColor } from '../../common/utils/colors';



const CustomProdScrollView = (props) => {
  const {
    title,
    Data,
    NavMenu
  } = props;
  return (
    <AppView height={30} margin={2}>
      <AppText color={getThemeColor('darkgrey')} size={6} >{title}</AppText>
      <AppScrollView stretch centerX flexGrow horizontal marginVertical={2}>
        {Data.data.dataarr.map((item) => (
          <ProdItem key={item.id} item={item} NavMenu={NavMenu} />
        ))}
      </AppScrollView>
    </AppView>
  );
};

export default CustomProdScrollView;
