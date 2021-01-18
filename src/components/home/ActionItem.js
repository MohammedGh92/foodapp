import React, {useCallback, useEffect, useState} from 'react';
import {TouchableView, AppText, AppIcon, AppSpinner} from '../../common';

const ActionItem = ({
  name,
  type,
  title,
  activeText,
  onPress,
  touchableOpacity,
  isActive,
  provider,
  processing,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    if (!provider || isLoading) {
      return;
    }
    setIsLoading(true);
    await provider();
    setIsLoading(false);
  }, [provider, isLoading]);

  return (
    <TouchableView
      touchableOpacity={touchableOpacity}
      row
      onPress={onPress || getData}
      height={5}
      marginHorizontal={8}
      {...rest}>
      <AppIcon
        color={isActive ? 'primary' : 'grey'}
        {...(isActive ? {name: 'check', type: 'ant'} : {name, type})}
        size={10}
      />
      {isLoading || processing ? (
        <AppSpinner />
      ) : (
        <AppText
          size={6}
          color={isActive ? 'primary' : '#29235C'}
          marginHorizontal={2}>
          {isActive ? activeText : title}
        </AppText>
      )}
    </TouchableView>
  );
};

export default ActionItem;
