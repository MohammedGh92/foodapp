import React from 'react';

import { AppView, AppText, AppNavigation, AppButton, AppIcon } from '../common';
import { APPBAR_HEIGHT } from '../common/utils/responsiveDimensions';
const Navigation = require('react-native-navigation');
const goToNotifications = () => AppNavigation.push('notifications');

const Header = (props) => {



  const {
    backHandler,
    hideBack,
    title,
    rightItems,
    backgroundColor,
    showMenu,
    bold,
    showNotif,
    color,
    centerTitle,
    Ltitle
  } = props;
  const goBack = () => {
    if (backHandler) {
      backHandler();
    } else {
      AppNavigation.pop();
    }
  };

  const renderRight = () => {
    if (showNotif) {
      return (
        <AppButton onPress={goToNotifications} flex transparent>
          <AppIcon name="notifications" type="material" size={10} />
        </AppButton>
      );
    }
    if (rightItems) {
      return (
        <AppView flex={2} stretch>
          {rightItems()}
        </AppView>
      );
    }
    return <AppView flex />;
  };

  const renderLeft = () => {
    if (hideBack) {
      return <AppView stretch flex />;
    }


    if (showMenu) {
      return (
        <AppButton margin={3} flex onPress={AppNavigation.openMenu} transparent>
          <AppIcon color={color} name="menu" type="feather" size={12} />
        </AppButton>
      );
    }



    return (
      <AppButton margin={3} transparent flex onPress={goBack}>
        <AppIcon color={color} flip name="md-arrow-back" type="ion" size={12} />
      </AppButton>
    );
  };

  const renderCenter = () => {
    return (
        <AppView left={!centerTitle} center={centerTitle} width={80}>
          <AppText
            size={bold ? 10 : 8}
            bold={bold}
            numberOfLines={1}
            color={color}
            margin={2}
          >
            {title}
          </AppText>
        </AppView>
    );
  };
  return (
        <AppView
          elevation={1.1}
          center
          backgroundColor={backgroundColor}
          stretch
          style={{
            height: APPBAR_HEIGHT,
          }}
          row
          spaceBetween>
          {renderLeft()}
          {renderCenter()}
          {renderRight()}
        </AppView>
  );
};

Header.defaultProps = {
          hideBack: false,
  showNotif: false,
  color: '#29235C',
  backgroundColor: 'transparent',
};
export default Header;
