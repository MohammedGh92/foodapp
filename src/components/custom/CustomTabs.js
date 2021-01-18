import React from 'react';
import { AppView } from '../../common';
import HeaderTab from '../HeaderTab';
const CustomTabs = (props) => {
  return (
    <AppView stretch row spaceBetween>
      {props.Titles.map((title,index) => (
        <HeaderTab title={title} value={index+1} />
      ))}
    </AppView>
  );
};

export default CustomTabs;
