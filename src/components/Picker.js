import React, {useState, useMemo, useRef, useEffect, useCallback} from 'react';
import {AppView, AppSpinner, AppText, AppIcon} from '../common';
import InputError from '../common/micro/InputError';
import ReactNativePickerModule from 'react-native-picker-module';
import TouchableView from '../common/TouchableView';

import {getTheme} from '../common/Theme';
import BlockingView from './BlockingView';
const Picker = ({
  title,
  name,
  error,
  setFieldValue,
  processing,
  onChangeValue,
  isDirty,
  value,
  label,
  initialValue,
  touchableOpacity,
  data,
  isEditable,
  ...rest
}) => {
  const placeholder = useMemo(() => `${title}`, [title]);
  const showError = useMemo(() => error && isDirty, [error, isDirty]);
  let pickerRef = useRef();
  const [selectedCode, setSelectedCode] = useState(
    initialValue
      ? initialValue
      : {
          label: placeholder,
          value: null,
        },
  );
  const onSelect = useCallback(
    (pickerValue) => {
      const indx = data.findIndex((item) => item[`${label}`] === pickerValue);
      const val = data[indx][`${value}`];
      setSelectedCode({
        label: pickerValue,
        value: val,
      });
      if (onChangeValue) {
        onChangeValue(val);
      }
      if (setFieldValue) {
        setFieldValue(name, val);
      }
    },
    [data, label, name, onChangeValue, setFieldValue, value],
  );
  const memoizedData = useMemo(() => {
    return data ? data.map((item) => item[`${label}`]) : [];
  }, [data, label]);

  const isInitialized = useRef(false);
  useEffect(() => {
    if (!processing) {
      if (!isInitialized.current) {
        isInitialized.current = true;
      } else {
        setSelectedCode({
          label: title,
          value: title,
        });
      }
    }
  }, [processing, title, label, value, onSelect]);
  return (
    <AppView backgroundColor="#ECEFF063" stretch {...{rest}}>
      {!processing ? (
        <TouchableView
          spaceBetween
          row
          height={6}
          touchableOpacity={true}
          onPress={() => {
            pickerRef.current.show();
          }}
          stretch
          {...rest}>
          <AppView stretch centerY>
            <AppText>{selectedCode.label + ''}</AppText>
            <ReactNativePickerModule
              pickerRef={pickerRef}
              selectedValue={selectedCode.value}
              title={placeholder}
              items={memoizedData}
              onValueChange={onSelect}
            />
          </AppView>
          <AppIcon size={10} name="keyboard-arrow-down" type="material" />
        </TouchableView>
      ) : (
        <AppSpinner />
      )}
      {showError && <InputError error={error} size={7} />}
      {!isEditable && <BlockingView />}
    </AppView>
  );
};
Picker.defaultProps = {
  ...getTheme().input,
};

export default Picker;
