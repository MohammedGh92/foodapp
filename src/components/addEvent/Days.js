import React, {useMemo, useState} from 'react';
import {
  AppButton,
  AppDatePicker,
  AppIcon,
  AppText,
  AppView,
} from '../../common';
import I18n from 'react-native-i18n';
import InputError from '../../common/micro/InputError';
import {useSelector} from 'react-redux';
const Days = ({setFieldValue, isDirty, error, name}) => {
  const showError = useMemo(() => error && isDirty, [error, isDirty]);
  const [dates, setDates] = useState([null]);
  const rtl = useSelector((state) => state.lang.rtl);
  return (
    <>
      <AppView marginBottom={10} stretch bottom row spaceBetween>
        <AppView>
          <AppText size={7} color="secondary">
            {I18n.t('event-date')}
          </AppText>
          <AppText>{I18n.t('you-can-add-time')}</AppText>
        </AppView>
        <AppButton
          onPress={() => setDates((prev) => [...dates, null])}
          backgroundColor="foreground"
          equalSize={9}
          center>
          <AppIcon size={8} color="white" name="plus" type="ant" />
        </AppButton>
      </AppView>
      {dates.map((item, index) => (
        <AppDatePicker
          presentationFormat={`${
            rtl ? 'hh:mm:ssA   YYYY-MM-DD' : 'DD-MM-YYYY   hh:mm:ssA'
          }`}
          key={index}
          onSelect={(val) => {
            const datesClone = [...dates];
            datesClone[index] = val;
            setDates(datesClone);
            setFieldValue(
              name,
              datesClone.filter((item) => item !== null),
            );
          }}
          stretch
          paddingHorizontal={5}
          momentFormat="YYYY-MM-DD HH:mm:ss"
          minDate={new Date()}
          borderWidth={0}
          elevation={1}
          rightItems={
            <AppIcon size={9} margin={5} name="date-range" type="material" />
          }
        />
      ))}
      {showError && <InputError error={error} size={7} />}
    </>
  );
};

export default Days;
