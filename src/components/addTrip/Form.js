import React from 'react';
import {
  AppView,
  AppInput,
  AppText,
  ImagePicker,
  AppButton,
  AppSpinner,
  AppDatePicker,
} from '../../common';
import I18n from 'react-native-i18n';
import {LoadingPicker} from '..';
import {PickersRepo} from '../../repo';
import LocationPickers from './LocationPickers';
import LocationInput from './LocationInput';
import StopPoints from './StopPoints';
const pickersRepo = new PickersRepo();
const Form = ({
  injectFormProps,
  event_country,
  setFieldValue,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <AppView stretch>
      <LoadingPicker
        provider={pickersRepo.getTripTypes}
        title={I18n.t('trip-type')}
        setFieldValue={setFieldValue}
        {...injectFormProps('trip_type_id')}
      />
      <LocationPickers
        {...{event_country}}
        {...{pickersRepo}}
        {...{setFieldValue}}
        {...{injectFormProps}}
      />
      <AppInput
        maxLength={150}
        stretch
        placeholder={I18n.t('address')}
        {...injectFormProps('address')}
      />
      <LocationInput {...injectFormProps('location')} marginVertical={5} />

      <AppInput
        number
        maxLength={5}
        marginVertical={5}
        placeholder={I18n.t('trip-price')}
        {...injectFormProps('price')}
      />
      <AppInput
        number
        maxLength={6}
        marginVertical={5}
        placeholder={I18n.t('expected-duration')}
        {...injectFormProps('expected_trip_duration')}
      />

      <AppInput
        maxLength={2}
        number
        marginVertical={5}
        placeholder={I18n.t('trip-number')}
        {...injectFormProps('available_users_number')}
      />
      <AppInput
        number
        maxLength={2}
        marginVertical={5}
        placeholder={I18n.t('deviation_time')}
        {...injectFormProps('deviation_time')}
      />
      <AppView stretch>
        <AppText marginVertical={5} size={6} color="secondary">
          {I18n.t('trip-date')}
        </AppText>
        <AppDatePicker
          momentFormat="YYYY-MM-DD"
          stretch
          mode="date"
          borderWidth={0}
          elevation={1}
          {...injectFormProps('trip_date', 'onSelect')}
        />
        <AppDatePicker
          borderWidth={0}
          elevation={1}
          stretch
          mode="time"
          placeholder={I18n.t('trip-time')}
          momentFormat="HH:mm"
          {...injectFormProps('beginning_time', 'onSelect')}
        />
      </AppView>
      <StopPoints {...injectFormProps('stop_points')} />
      <AppButton onPress={handleSubmit} marginVertical={5} stretch>
        {isSubmitting ? (
          <AppSpinner color="white" />
        ) : (
          <AppText size={8} color="white">
            {I18n.t('save')}
          </AppText>
        )}
      </AppButton>
    </AppView>
  );
};

export default Form;
