import React, {useCallback, useRef} from 'react';

import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  AppInput,
} from '../common';
import {APPBAR_HEIGHT} from '../common/utils/responsiveDimensions';

const goToNotifications = () => AppNavigation.push('notifications');
const Header = (props) => {
  const {
    backHandler,
    title,
    backgroundColor,
    color,
    keyword,
    setKeyword,
  } = props;
  const goBack = () => {
    if (backHandler) {
      backHandler();
    } else {
      AppNavigation.pop();
    }
  };
  const inputRef = useRef();
  const text = useRef('');
  const onChange = useCallback((val) => {
    text.current = val;
  }, []);

  const onSubmitEditing = useCallback(
    (val) => {
      setKeyword(val);
    },
    [setKeyword],
  );
  const renderLeft = () => {
    return (
      <AppButton transparent flex onPress={goBack}>
        <AppIcon color={color} flip name="md-arrow-back" type="ion" size={12} />
      </AppButton>
    );
  };

  const renderCenter = () => {
    return (
      <AppView center flex={6}>
        <AppInput
          stretch
          borderWidth={0}
          elevation={0}
          ref={inputRef}
          value={keyword}
          returnKeyType="search"
          onChange={onChange}
          onSubmitEditing={onSubmitEditing}
          placeholder={title}
          rightItems={
            <AppIcon
              onPress={() => {
                onSubmitEditing(text.current);
              }}
              margin={5}
              name="search1"
              type="ant"
              color="secondary"
              size={9}
            />
          }
          {...{onSubmitEditing}}
        />
      </AppView>
    );
  };
  return (
    <AppView
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
    </AppView>
  );
};

Header.defaultProps = {
  showNotif: false,
  color: '#29235C',
  backgroundColor: 'transparent',
};
export default Header;
