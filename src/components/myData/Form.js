import React, {useMemo} from 'react';
import {
  AppButton,
  AppDatePicker,
  AppIcon,
  AppInput,
  AppSpinner,
  AppText,
  AppView,
  ImagePicker,
} from '../../common';
import I18n from 'react-native-i18n';
import LocationPickers from '../addEvent/LocationPickers';

import {PickersRepo} from '../../repo';
import Picker from '../Picker';
import BlockingView from '../BlockingView';

const pickersRepo = new PickersRepo();
const Form = ({
  injectFormProps,
  setFieldValue,
  data,
  initialValue,
  handleSubmit,
  isSubmitting,
  isEditable,
}) => {
  const genderData = useMemo(() => {
    return [
      {name: I18n.t('male'), id: 'male'},
      {name: I18n.t('female'), id: 'female'},
    ];
  }, []);

  return (
    <AppView stretch marginHorizontal={10}>
      <AppView marginVertical={5} stretch center>
        <ImagePicker
          {...injectFormProps('image')}
          {...{initialValue}}
          circleRadius={20}
          borderWidth={2}
          size={20}
          borderColor="white"
        />
        <AppText size={7} color="secondary">
          {I18n.t('user-image')}
        </AppText>
        {!isEditable && <BlockingView />}
      </AppView>
      <AppInput
        {...{isEditable}}
        {...injectFormProps('name')}
        placeholder={I18n.t('user-name')}
        marginVertical={5}
        elevation={2}
      />

      <AppInput
        {...{isEditable}}
        {...injectFormProps('about')}
        placeholder={I18n.t('about-me')}
        marginVertical={5}
        elevation={2}
      />

      <AppInput
        {...{isEditable}}
        {...injectFormProps('email')}
        placeholder={I18n.t('email')}
        marginVertical={5}
        elevation={2}
        email
      />

      <AppInput
        {...{isEditable}}
        number
        {...injectFormProps('phone')}
        placeholder={I18n.t('phone-number')}
        marginVertical={5}
        elevation={2}
      />
      <Picker
        {...{isEditable}}
        title={I18n.t('gender')}
        {...injectFormProps('gender')}
        {...{setFieldValue}}
        {...(data.gender
          ? {initialValue: {label: I18n.t(`${data.gender}`), id: data.gender}}
          : {})}
        marginVertical={5}
        label="name"
        value="id"
        data={genderData}
      />
      <LocationPickers
        {...{isEditable}}
        {...{data}}
        {...{pickersRepo}}
        {...{setFieldValue}}
        {...{injectFormProps}}
      />
      <AppInput
        {...{isEditable}}
        {...injectFormProps('address')}
        placeholder={I18n.t('address')}
        marginVertical={5}
        elevation={2}
        marginBottom={10}
      />

      <AppDatePicker
        {...{isEditable}}
        placeholder={I18n.t('birth-date')}
        {...injectFormProps('birth_date', 'onSelect')}
        stretch
        momentFormat="YYYY-MM-DD"
        maxDate={new Date()}
        borderWidth={0}
        mode="date"
        elevation={2}
        rightItems={
          <AppIcon size={9} margin={5} name="date-range" type="material" />
        }
      />
      {isEditable && (
        <AppButton
          disabled={isSubmitting}
          onPress={handleSubmit}
          stretch
          marginVertical={5}>
          {isSubmitting ? (
            <AppSpinner color="white" />
          ) : (
            <AppText color="white" size={6}>
              {I18n.t('save')}
            </AppText>
          )}
        </AppButton>
      )}
    </AppView>
  );
};

export default Form;
