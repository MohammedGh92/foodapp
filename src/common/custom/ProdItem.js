import React, { useCallback,useEffect } from 'react';
import { AppText, AppView, AppImage, TouchableView, AppNavigation } from '..';

const ProdItem = (props) => {
  const {
    item,
    NavMenu
  } = props;

useEffect(() => {
  }, []);

  const OnClick = useCallback(() => {

    AppNavigation.push({
      name: NavMenu ,
      passProps: {
        data: item,
      },
    })
  }, []);

  return (
    <TouchableView onPress={OnClick}>
      <AppView backgroundColor='#f7f7f7' marginHorizontal={props.marginHorizontal} margin={4} elevation={3} resizeMode="stretch" height={24} width={30}>
        <AppView backgroundColor={item.new ? '#4DB7AD' : '#f7f7f7'} width={10} height={3} borderRadius={3}>
          {
            item.new &&
            <AppText size={5} center bold color='white'>New</AppText>
          }
        </AppView>
        <AppImage center resizeMode="stretch" height={13} margin={3} width={26}
          source={item.image ? { uri: item.image } : require('../../assets/imgs/MainCat4.jpg')}>
        </AppImage>

        <AppText size={5} color='darkgrey'>  {item.name}</AppText>
        <AppText size={5} color='grey'>  {item.price}$</AppText>

      </AppView>
    </TouchableView>
  );
};

export default ProdItem;
