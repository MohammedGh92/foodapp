import React, {useCallback} from 'react';
import {AppView, AppRadioButton} from '../common';
import {RADIO_BUTTON_DISPLAY_NAME} from '../common/utils/Constants';
const RadioItem = (props) => {
  return (
    <AppView stretch row paddingRight={5}>
      <AppRadioButton {...props} size={5.5} marginHorizontal={5} />
    </AppView>
  );
};

RadioItem.displayName = RADIO_BUTTON_DISPLAY_NAME;
export default RadioItem;
