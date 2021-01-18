import React, { useCallback } from 'react';
import { AppIcon, AppButton, AppNavigation, AppView } from '../../common';
import { Header } from '..';
import { getThemeColor } from '../../common/utils/colors';
import { useSelector } from 'react-redux';
const CustomHeader = ({
  Rtitle,
  title,
  showMenu,
  centerTitle

}) => {

  return (
    <Header
      color={'#222222'}
      title={title}
      showMenu={showMenu}
      centerTitle={centerTitle}
    />
  );
};

export default CustomHeader;
