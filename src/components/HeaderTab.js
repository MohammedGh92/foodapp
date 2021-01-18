import React, {useCallback, useContext} from 'react';
import {AppText, TouchableView} from '../common';
import TabsContext from '../contexts/TabsContext';

const HeaderTab = ({title, value}) => {
  const {selected, setSelected} = useContext(TabsContext);
  const borderProps =
    selected === value ? {borderColor: 'foreground', borderBottomWidth: 2} : {};
  const onPressTab = useCallback(() => {
    setSelected(value);
  }, [value, setSelected]);
  return (
    <TouchableView
      onPress={onPressTab}
      flex
      stretch
      height={7}
      center
      {...borderProps}>
      <AppText numberOfLines={3} color="secondary">
        {title}
      </AppText>
    </TouchableView>
  );
};

export default HeaderTab;
