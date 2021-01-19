import React from 'react';
import { Linking } from 'react-native'
import { ScrollableContainer } from '../../components/';
import Item from '../../components/menu/Item';
import { AppNavigation, AppView, AppImage } from '../../common';
import { share } from '../../utils/Share';

const Menu = () => {

  return (
    <ScrollableContainer header={false}>

      <AppView height={30} />

      <Item
        onPress={() => AppNavigation.navigateToHome()}
        title={'Home'} name="home" type="ant"
      />
      <Item
        onPress={() => AppNavigation.push({ name: 'category' })}
        title={'Category'} name="category" type="material"
      />

      <Item
        onPress={() => AppNavigation.push({ name: 'Search' })}
        title={'Search'} name="search1" type="ant"
      />

      <Item
        onPress={() => share("https://play.google.com/store/apps/details?id=com.mhmdgh.foodapp")}
        title={'Share'} name="sharealt" type="ant"
      />

      <Item
        onPress={() => AppNavigation.push({ name: 'aboutus' })}
        title={'About'} name="page" type="foundation"
      />

      <Item
        onPress={() => Linking.openURL('mailto:mohammedghabyen@gmail.com')}
        title={'Contact'} name="mail" type="ant"
      />

    </ScrollableContainer>
  );
};

export default Menu;
