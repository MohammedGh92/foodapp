import React, {useState} from 'react';

import View from './View';
import ScrollView from './ScrollView';
import {CHECK_BOX_DISPLAY_NAME} from './utils/Constants';

const CheckBoxGroup = ({
  initialValue,
  editable,
  name,
  onChange,
  children,
  horizontal,
  scrollable,
  size,
  activeColor,
  normalColor,
  childrenMargin,
  ...rest
}) => {
  const [checkedValues, setCheckedValues] = useState(initialValue);

  const onCheckBoxClicked = (value, index) => {
    if (name && !editable) {
      return;
    }
    const indexInArray = checkedValues.indexOf(value);

    let newList = [];
    if (indexInArray === -1) {
      newList = [...checkedValues, value];
      setCheckedValues(newList);
    } else {
      newList = [
        ...checkedValues.slice(0, indexInArray),
        ...checkedValues.slice(indexInArray + 1),
      ];
      setCheckedValues(newList);
    }

    if (onChange) {
      if (name) {
        onChange(name, newList);
      } else {
        onChange(newList);
      }
    }
  };

  let counter = 0;
  const nodes =
    children && children.map
      ? children.map((child, index) => {
          if (
            (child.type.WrappedComponent &&
              child.type.WrappedComponent.displayName ===
                CHECK_BOX_DISPLAY_NAME) ||
            (child.type && child.type.displayName === CHECK_BOX_DISPLAY_NAME)
          ) {
            return React.cloneElement(child, {
              key: String(index),
              onPress: onCheckBoxClicked,
              checked: checkedValues.indexOf(child.props.value) !== -1,
              size,
              activeColor,
              normalColor,
              index: counter++,
              mr: horizontal && scrollable ? childrenMargin : 0,
              mv: !horizontal ? childrenMargin : 0,
            });
          }

          return child;
        })
      : React.cloneElement(children, {
          onPress: onCheckBoxClicked,
          checked: checkedValues.indexOf(children.props.value) !== -1,
          size,
          activeColor,
          normalColor,
          index: counter++,
          mr: horizontal && scrollable ? childrenMargin : 0,
          mv: !horizontal ? childrenMargin : 0,
        });

  if (horizontal && scrollable) {
    return (
      <View row {...rest}>
        <ScrollView row>{nodes}</ScrollView>
      </View>
    );
  }
  if (horizontal) {
    return (
      <View stretch row stretchChildren spaceAround {...rest}>
        {nodes}
      </View>
    );
  }

  return (
    <View stretch {...rest}>
      {nodes}
    </View>
  );
};

CheckBoxGroup.defaultProps = {
  initialValue: [],
  childrenMargin: 2,
};

export default CheckBoxGroup;
