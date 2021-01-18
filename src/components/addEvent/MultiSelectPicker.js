import React, {useMemo, useRef, useEffect, useCallback, useState} from 'react';
import Picker from '../Picker';
import I18n from 'react-native-i18n';

import {getTheme} from '../../common/Theme';
import {
  AppView,
  TouchableView,
  AppText,
  AppSpinner,
  AppNavigation,
  AppIcon,
} from '../../common';
import InputError from '../../common/micro/InputError';
import CheckboxPicker from '../CheckboxPicker';
const MultiSelectPicker = ({
  title,
  error,
  provider,
  setFieldValue,
  isDirty,
  name,
  ...rest
}) => {
  const showError = useMemo(() => error && isDirty, [error, isDirty]);
  const [selectedValues, setSelectedValues] = useState([]);
  const pickerRef = useRef();

  const [content, setContent] = useState({
    data: [],
    isLoading: true,
  });

  const showPicker = useCallback(() => {
    if (content.isLoading) {
      return;
    }
    AppNavigation.push({
      name: 'selection',
      passProps: {
        data: content.data,
        initialValue: selectedValues,
        onSelect: (values) => {
          console.log(values);
          setFieldValue(name, values);
          setSelectedValues(values);
        },
      },
    });
  }, [content.isLoading, content.data, name, selectedValues, setFieldValue]);

  useEffect(() => {
    getData();
  }, [getData]);
  const getData = useCallback(async () => {
    setContent((prev) => ({...prev, isLoading: true}));
    if (provider) {
      const data = await provider();
      setContent({
        data,
        isLoading: false,
      });
    }
    setContent((prev) => ({...prev, isLoading: false}));
  }, [provider]);
  return (
    <AppView stretch>
      <TouchableView
        row
        spaceBetween
        onPress={showPicker}
        stretch
        marginVertical={5}
        label="name"
        value="id"
        {...rest}>
        <AppView flex stretch>
          {content.isLoading ? (
            <AppSpinner centerSelf />
          ) : selectedValues.length === 0 ? (
            <AppText>{title + ''}</AppText>
          ) : (
            <AppText>
              {content.data
                .filter(
                  (item) =>
                    selectedValues.findIndex((val) => val === item.id) >= 0,
                )
                .map((item) => item.name + ' ')}
            </AppText>
          )}
        </AppView>
        <AppIcon name="ios-arrow-down" type="ion" />
      </TouchableView>
      {showError && <InputError error={error} size={7} />}
      <CheckboxPicker data={content.data} {...rest} ref={pickerRef} />
    </AppView>
  );
};
MultiSelectPicker.defaultProps = {
  ...getTheme().input,
};

export default MultiSelectPicker;
