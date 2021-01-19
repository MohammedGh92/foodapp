import React from 'react';
import { AppView, AppImage, AppText } from '../../common';
import { ScrollableContainer } from '../../components';

const AboutUs = () => {

  return (
    <ScrollableContainer title={'About App'} paddingHorizontal={10}>
      <AppView stretch center>
        <AppImage center resizeMode="contain" marginTop={10} height={20} width={70}
          source={require('../../assets/imgs/logo.png')}></AppImage>
        <AppText size={8} marginTop={10} color='darkgrey'>Recipes is a mobile application
        sample that provide shopping services, made
        by me, Mohammed Ghabyen.
</AppText>

        <AppText size={8} marginTop={10} color='darkgrey'>
          This application is developed using React-Native.
</AppText>

        <AppText size={8} marginTop={10} color='darkgrey'>I hope you find it useful and a good 
demo for react native apps.
</AppText>

      </AppView>
    </ScrollableContainer>
  );
};

export default AboutUs;
