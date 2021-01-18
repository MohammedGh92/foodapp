import React from 'react';
import { AppView, AppText, AppScrollView, AppListItem } from '../../common';
import { getThemeColor } from '../../common/utils/colors';



const CustomCatScrollView = (props) => {
  const {
    title,
    Data,
    ShowOverlay,
    NavMenu
  } = props;
  return (
    <AppView stretch marginVertical={3}>
      <AppText color={getThemeColor('darkgrey')} size={6} >{title}</AppText>
      <AppScrollView stretch centerX flexGrow horizontal marginVertical={2}>
        {Data.data.dataarr.map((item) => (
          <AppListItem key={item.id} item={item} ShowOverlay={ShowOverlay} NavMenu={NavMenu} />
        ))}
      </AppScrollView>
    </AppView>
  );
};

export default CustomCatScrollView;
