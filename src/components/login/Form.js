import React from 'react';
import {
  AppText,
  AppInput,
  AppView,
  TouchableView,
  AppButton,
  AppSpinner,
  AppNavigation,
  AppIcon,
} from '../../common';
import I18n from 'react-native-i18n';
import {MOBILE_LENGTH} from '../../common/utils/Constants';

const Form = ({injectFormProps, isPhone, isSubmitting, handleSubmit}) => {
  return (
    <AppView centerX stretch marginTop={10}>
      {isPhone ? (
        <AppInput
          phone
          marginVertical={3}
          {...injectFormProps('phone')}
          maxLength={MOBILE_LENGTH}
          placeholder={I18n.t('phone-number')}
          rightItems={
            <AppIcon size={9} margin={5} name="phone" type="feather" />
          }
        />
      ) : (
        <AppInput
          marginVertical={3}
          {...injectFormProps('email')}
          placeholder={I18n.t('email')}
          email
          rightItems={<AppIcon size={9} margin={5} name="mail-open-outline" />}
        />
      )}
      <AppInput
        marginVertical={3}
        {...injectFormProps('password')}
        placeholder={I18n.t('password')}
        secure={true}
        rightItems={<AppIcon size={9} margin={5} name="lock-closed-outline" />}
      />
      <AppView stretch row spaceBetween>
        <AppView />
        <TouchableView
          onPress={() => AppNavigation.push('forgotPassword')}
          padding={4}>
          <AppText color="white">{I18n.t('forgot-password')}</AppText>
        </TouchableView>
      </AppView>

      <AppButton
        disabled={isSubmitting}
        onPress={handleSubmit}
        stretch
        height={7}>
        {isSubmitting ? (
          <AppSpinner color="white" />
        ) : (
          <AppText bold size={8} color="white">
            {I18n.t('login')}
          </AppText>
        )}
      </AppButton>
      <AppView stretch marginVertical={5}>
        <TouchableView
          padding={4}
          onPress={() => AppNavigation.push('forgotPassword')}>
          <AppText color="foreground" size={7}>
            {I18n.t('forgot-password')}
          </AppText>
        </TouchableView>
      </AppView>
    </AppView>
  );
};

export default Form;
