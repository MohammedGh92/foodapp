import React, {useState, useMemo, useCallback} from 'react';
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  AppDatePicker,
} from '../../common';
import I18n from 'react-native-i18n';
import InputError from '../../common/micro/InputError';
import RadioGroup from '../../common/RadioGroup';
import RadioButton from '../../common/RadioButton';
import Days from './Days';
import TimePeriod from './TimePeriod';
const EventDate = ({injectFormProps, setFieldValue}) => {
  const [dateType, setDateType] = useState('specific_days');

  const onSetDateType = useCallback(
    (value) => {
      setDateType(value);
      setFieldValue('appointment_type', value);
    },
    [setFieldValue],
  );
  return (
    <>
      <AppView stretch>
        <AppView marginVertical={5}>
          <RadioGroup
            initialValue="specific_days"
            horizontal
            onSelect={onSetDateType}>
            <RadioButton label={I18n.t('date')} value="specific_days" />
            <RadioButton label={I18n.t('period')} value="time_period" />
          </RadioGroup>
        </AppView>
        {dateType === 'specific_days' && (
          <Days {...{setFieldValue}} {...injectFormProps('appointments')} />
        )}
        {dateType === 'time_period' && <TimePeriod {...{injectFormProps}} />}
      </AppView>
    </>
  );
};

export default EventDate;
