import React, { useCallback, useEffect } from 'react';
import { AppView, AppButton, AppText, AppIcon,AppNavigation } from '../../common';
import { CustomAppSwiper, ScrollableContainer } from '../../components';
import { getCategoryName, getCategoryById } from '../../data/MockDataAPI';

const Recipe = (props) => {
  const {
    item
  } = props;

  useEffect(() => {
    console.log(getCategoryById(item.categoryId));
  }, []);

  const ViewIngredients = useCallback(async () => {
    AppNavigation.push({
      name: 'ingredients',
      passProps: {
        item: item,
      },
    })
  }, []);

  return (
    <ScrollableContainer header={false} centerX flex>
      <CustomAppSwiper images={item.photosArray} />
      <AppText color="#090909" marginTop={10} bold size={10}>
        {item.title}
      </AppText>

      <AppText color="#68CE92" marginTop={10} bold size={8}>
        {getCategoryName(item.categoryId)}
      </AppText>

      <AppView center row marginTop={2} width={35} height={7}>
        <AppIcon color='black' name="clock" type="feather" size={10} />
        <AppText color="black" bold size={7}>
          {item.time} minutes
        </AppText>
      </AppView>

      <AppButton
        onPress={() => {
          ViewIngredients();
        }}
        width={75}
        backgroundColor='transparent'
        borderWidth={1}
        borderColor='#68CE92'
        marginTop={10}
        height={8}
        borderRadius={50}
      >
        <AppText color="#68CE92" size={7}>
          {'View ingredients'}
        </AppText>
      </AppButton>

      <AppText color="black" marginTop={10} size={7} style={{ width: '91%' }}>
        {item.description}
      </AppText>

    </ScrollableContainer>
  );
};

export default Recipe;