import React, {useState, useEffect, useMemo} from 'react';

import View from './View';
import ScrollView from './ScrollView';
import AppInputError from './micro/InputError';
import {RADIO_BUTTON_DISPLAY_NAME} from './utils/Constants';

const RadioGroup = ({
  initialValue,
  reset,
  onSelect,
  deselect,
  name,
  editable,
  children,
  horizontal,
  scrollable,
  size,
  activeColor,
  normalColor,
  childrenMargin,
  error,
  showError,
  isDirty,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  let isFirst = useMemo(() => true, []);
  const onRadioButtonSelect = (value, index) => {
    if (name && !editable) {
      return;
    }
    let v = value;
    if (value === selectedValue) {
      if (deselect) {
        setSelectedValue(null);
        v = null;
      } else {
        return;
      }
    } else {
      setSelectedValue(value);
    }

    if (onSelect) {
      if (name) {
        onSelect(name, v, v !== selectedValue);
      } else {
        onSelect(v, v !== selectedValue);
      }
    }
  };

  useEffect(() => {
    if (isFirst) {
      isFirst = false;
    } else {
      setSelectedValue('');
      if (onSelect) {
        if (name) {
          onSelect(name, '', false);
        } else {
          onSelect('', false);
        }
      }
    }
  }, [name, onSelect, reset]);
  let counter = 0;
  const isErrorVisible = showError && error && isDirty;
  const nodes = React.Children.map(children, (child, index) => {
    if (
      (child.type.WrappedComponent &&
        child.type.WrappedComponent.displayName ===
          RADIO_BUTTON_DISPLAY_NAME) ||
      (child.type && child.type.displayName === RADIO_BUTTON_DISPLAY_NAME)
    ) {
      return React.cloneElement(child, {
        key: String(index),
        onPress: onRadioButtonSelect,
        selected: child.props.value === selectedValue,
        size,
        activeColor,
        normalColor,
        index: counter++,
        marginRight: horizontal && scrollable ? childrenMargin : 0,
        marginVertical: !horizontal ? childrenMargin : 0,
      });
    }
    return child;
  });

  if (horizontal && scrollable) {
    return (
      <View row {...rest}>
        <ScrollView horizontal>{nodes}</ScrollView>
      </View>
    );
  }
  if (horizontal) {
    return (
      <View stretch>
        <View stretch row stretchChildren spaceBetween {...rest}>
          {nodes}
        </View>
        {isErrorVisible && (
          <AppInputError error={error} errorTextMarginHorizontal={5} size={7} />
        )}
      </View>
    );
  }

  return (
    <>
      <View stretch {...rest}>
        {nodes}
      </View>
      {isErrorVisible && (
        <AppInputError error={error} errorTextMarginHorizontal={5} size={5} />
      )}
    </>
  );
};

RadioGroup.defaultProps = {
  initialValue: -1,
  childrenMargin: 5,
  deselect: false,
};
export default RadioGroup;
