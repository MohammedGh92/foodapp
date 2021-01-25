import React, { useCallback, useEffect, useState } from 'react';
import { AppView, AppButton, AppText, AppIcon, AppNavigation } from '../../common';
import { CustomAppSwiper, ScrollableContainer } from '../../components';
import { getCategoryById } from '../../data/MockDataAPI';
import { WebView } from 'react-native-webview';

const Recipe = (props) => {
  const {
    item
  } = props;

  useEffect(() => {
    console.log(getCategoryById(item.categoryId));
  }, []);

  const [showVideo, setshowVideo] = useState(false);
  const [showDesc, setshowDesc] = useState(false);

  const ViewIngredients = useCallback(async () => {
    AppNavigation.push({
      name: 'ingredients',
      passProps: {
        item: item,
      },
    })
  }, []);

  const ViewVideo = useCallback(async () => {
    setshowVideo(true);
  }, []);

  const ViewDesc = useCallback(async () => {
    setshowDesc(true);
  }, []);

  const DetailsItem = (title, CallBackFun) => {
    return (
      <AppButton
        onPress={() => CallBackFun()}
        width={60}
        backgroundColor='#f9f7f7'
        marginTop={10}

        height={8}
        borderRadius={10}
      >
        <AppText color="#112d4e" size={7}>
          {title}
        </AppText>
      </AppButton >)
  }

  return (
    <AppView centerX flex>
      <CustomAppSwiper images={item.photosArray} />
      <AppView centerY backgroundColor='#f9f7f7' width={100} height={10}>
        <AppText color="#3f72af" margin={4} bold size={9}>
          {item.title}
        </AppText>
      </AppView>

      <AppView marginTop={5} center>
        {DetailsItem('Ingredients', ViewIngredients)}
        {DetailsItem('How to make?!', ViewDesc)}
        {DetailsItem('Video guide', ViewVideo)}
      </AppView>

      {showVideo && <AppView center style={{ position: 'absolute' }} width={100} height={100}>

        <AppView style={{ position: 'absolute', opacity: 0.3 }}
          backgroundColor='black' width={100} height={100} />

        <AppView
          backgroundColor='white' borderRadius={30} width={90} height={37} >
          <AppView center marginLeft={7} marginTop={3} spaceBetween width={82.5} row >
            <AppView />
            <AppText size={8} color='gray'>Video guide</AppText>
            <AppIcon onPress={() => setshowVideo(false)}
              name="close" type="ant" size={10} />
          </AppView>

          <AppView margin={7} backgroundColor='black' width={82} height={27.5}>
            <WebView style={{ height: '100%', width: '100%' }}
              source={{ uri: item.video }} />
          </AppView>

        </AppView>

      </AppView>}


      {showDesc && <AppView center style={{ position: 'absolute' }} width={100} height={100}>

        <AppView style={{ position: 'absolute', opacity: 0.3 }}
          backgroundColor='black' width={100} height={100} />

        <AppView
          backgroundColor='white' borderRadius={30} width={90} height={85} >

          <AppIcon onPress={() => setshowDesc(false)} marginLeft={120}
            marginTop={5} name="close" type="ant" size={10} />

          <ScrollableContainer margin={5} center header={false}>
            <AppText center size={8} color='gray'>How to make</AppText>
            <AppText marginTop={5} size={5} color='gray'>{item.description}</AppText>
          </ScrollableContainer>

        </AppView>

      </AppView>}

    </AppView >
  );
};

export default Recipe;