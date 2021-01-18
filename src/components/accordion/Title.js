import React from 'react';
import AccordionIcon from './AccordionIcon';
import {bInterpolateColor} from 'react-native-redash';
import colors from '../../common/defaults/colors';
import {AppTouchableAniamtedView as AnimatedView, AppText} from '../../common';
const Title = ({transition, title, open, toggleAccordion}) => {
  const backgroundColor = bInterpolateColor(
    transition,
    'white',
    colors.primary,
  );
  return (
    <AnimatedView
      onPress={toggleAccordion}
      paddingVertical={4}
      spaceBetween
      stretch
      height={9}
      row
      paddingHorizontal={5}>
      <AppText size={7} color="secondary">
        {title}
      </AppText>
      <AccordionIcon {...{open}} {...{transition}} />
    </AnimatedView>
  );
};

export default Title;
