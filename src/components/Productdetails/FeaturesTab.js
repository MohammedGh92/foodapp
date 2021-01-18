import React from 'react';
import { AppView, AppText } from '../../common';
import { CustomTxtItem } from '..';
const FeaturesTab = (props) => {

  const { type, price,inventoryManagement,inventoryPolicy,taxCode,optionTitle } = props.data;

  return (
    <AppView backgroundColor='white' flexGrow width={90}>
      <CustomTxtItem title='type' value={type} />
      <CustomTxtItem title='price' value={price} />
      <CustomTxtItem title='inventoryManagement' value={inventoryManagement?'Yes':'No'} />
      <CustomTxtItem title='inventoryPolicy' value={inventoryPolicy?'Yes':'No'} />
      <CustomTxtItem title='taxCode' value={taxCode} />
      <CustomTxtItem title='optionTitle' value={optionTitle} />
    </AppView>
  );
};

export default FeaturesTab;