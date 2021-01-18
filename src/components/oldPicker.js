import React, {useState, useMemo, useRef} from 'react';
import {AppPicker, AppView, AppSpinner, AppText} from '../common';
import InputError from '../common/micro/InputError';
import {useSelector} from 'react-redux';
import I18n from 'react-native-i18n';
import ReactNativePickerModule from 'react-native-picker-module';
import TouchableView from '../common/TouchableView';
const Picker = ({
  title,
  name,
  error,
  setFieldValue,
  processing,
  onChangeValue,
  isDirty,
  data,
  ...rest
}) => {
  const rtl = useSelector((state) => state.lang.rtl);
  const placeholder = useMemo(() => `${I18n.t('choose')} ${title}`, [title]);
  const showError = error && isDirty;
  let pickerRef = null;
  const memoizedData = useMemo(() => {
    return data
      ? data.map(({piece, name: itemName, id}) => {
          if (piece) {
            const label = piece.name;
            const value = piece.id;
            return {label, value};
          }
          const label = itemName;
          const value = id;
          return {label, value};
        })
      : [];
  }, [data]);
  const [selectedCode, setSelectedCode] = useState({
    label: placeholder,
    value: null,
  });
  const onSelect = (pickerValue, indx) => {
    const val = memoizedData[indx].value;
    console.log(pickerValue, val);
    setSelectedCode({
      label: pickerValue,
      value: val,
    });
    if (onChangeValue) {
      onChangeValue(val);
      // return
    }
    if (setFieldValue) {
      setFieldValue(name, val);
    }
  };

  return (
    // <Row {...{title}}>
    <AppView {...{rest}}>
      {!processing ? (
        <TouchableView
          marginHorizontal={4}
          centerY
          height={6}
          onPress={() => pickerRef.show()}
          stretch
          {...rest}>
          <AppText>{selectedCode.label + ''}</AppText>
          <ReactNativePickerModule
            pickerRef={(e) => (pickerRef = e)}
            selectedValue={selectedCode.value}
            title={placeholder}
            items={memoizedData.map((item) => item.label)}
            onValueChange={onSelect}
          />
        </TouchableView>
      ) : (
        <AppSpinner />
      )}
      {showError && <InputError error={error} size={7} />}
    </AppView>
    // </Row>
  );
};

export default Picker;
