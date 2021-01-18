import React, {useState, useCallback} from 'react';
import {
  AppView,
  AppInput,
  AppText,
  ImagePicker,
  AppButton,
  AppSpinner,
} from '../../common';
import I18n from 'react-native-i18n';
import {PickersRepo} from '../../repo';
import LocationPickers from './LocationPickers';
import MultiSelectPicker from './MultiSelectPicker';
import EventDate from './EventDate';
import EventPlace from './EventPlace';
const pickersRepo = new PickersRepo();
const Form = ({injectFormProps, setFieldValue, isSubmitting, handleSubmit}) => {
  return (
    <AppView stretch>
      <AppInput
        marginVertical={5}
        maxLength={100}
        {...injectFormProps('name')}
        placeholder={I18n.t('event-name')}
      />
      <AppView stretch row spaceBetween centerX>
        <AppText size={6} color="secondary">
          {I18n.t('event-photo')}
        </AppText>
        <ImagePicker {...injectFormProps('image')} />
      </AppView>
      <LocationPickers
        {...{pickersRepo}}
        {...{setFieldValue}}
        {...{injectFormProps}}
      />
      <AppInput
        maxLength={150}
        marginVertical={5}
        {...injectFormProps('address')}
        placeholder={I18n.t('address')}
      />
      <EventPlace {...injectFormProps('location')} />
      <MultiSelectPicker
        provider={pickersRepo.getEventTypes}
        {...injectFormProps('event_type_ids')}
        title={I18n.t('event-type')}
        {...{setFieldValue}}
      />
      <MultiSelectPicker
        provider={pickersRepo.getTargetGroups}
        {...injectFormProps('target_group_ids')}
        title={I18n.t('target-groups')}
        {...{setFieldValue}}
      />
      <EventDate {...{injectFormProps}} {...{setFieldValue}} />
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
