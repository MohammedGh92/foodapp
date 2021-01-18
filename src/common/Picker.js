import React, {useMemo} from 'react';
import {Picker, Platform} from 'react-native';
import AppView from './View';
import {responsiveHeight, responsiveWidth} from './utils/responsiveDimensions';

export default (props) => {
  const {
    items,
    onSelect,
    selectedValue,
    height,
    placeholder,
    width,
    enabled,
    ...rset
  } = props;
  const memoizedItemStyles = useMemo(() => {
    return {
      itemStyle:
        Platform.OS === 'ios' ? {height: responsiveHeight(height)} : {},
    };
  }, [height]);
  const memoizedDimStyles = useMemo(() => {
    return {
      height: responsiveHeight(height),
      width: width ? responsiveWidth(width) : '100%',
    };
  }, [height, width]);
  return (
    <AppView {...rset}>
      <Picker
        enabled={enabled}
        selectedValue={selectedValue}
        style={memoizedDimStyles}
        onValueChange={(value, index) => onSelect(value, index)}
        itemStyles={memoizedItemStyles}>
        <Picker.Item color="#303030" label={placeholder} value="" />
        {items.map((item) => (
          <Picker.Item
            color="#303030"
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </AppView>
  );
};
