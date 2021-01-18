import React from 'react';
import { AppView, AppText } from '../../common';
import { CustomTxtItem } from '..';
const OverViewTab = (props) => {

  const { desc } = props.data;

  return (
    <AppView backgroundColor='white' flexGrow width={90}>
      <AppText margin={5} color='darkgrey'>{desc}</AppText>
    </AppView>
  );
};

export default OverViewTab;