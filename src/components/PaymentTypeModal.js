import React, {forwardRef, useCallback} from 'react';

import useModal from './useModal';
import I18n from 'react-native-i18n';
import {
  AppNavigation,
  AppRadioButton as RadioButton,
  AppModal,
  AppView,
  AppText,
  AppButton,
  AppForm,
  AppSpinner,
  AppRadioGroup,
  AppScrollView,
} from '../common';
export default forwardRef(({request_id, ...rest}, ref) => {
  const [isVisible, changeState, show, hide] = useModal(ref);

  const renderContent = useCallback(
    ({injectFormProps, handleSubmit, isSubmitting}) => {
      return (
        <AppView
          height={45}
          paddingHorizontal={5}
          backgroundColor="white"
          width={90}
          borderRadius={10}>
          <AppScrollView flexGrow stretch centerX>
            <AppView centerX marginTop={10} stretch>
              <AppText color="secondary" bold size={7}>
                {I18n.t('payment-type')}
              </AppText>
              <AppRadioGroup
                showError
                {...injectFormProps('payment_type', 'onSelect')}>
                <RadioButton
                  touchableOpacity
                  value="MADA"
                  label={I18n.t('mada')}
                />
                <RadioButton
                  touchableOpacity
                  value="CREDIT"
                  label={I18n.t('credit')}
                />
              </AppRadioGroup>
            </AppView>
          </AppScrollView>
          <AppButton
            marginVertical={5}
            onPress={handleSubmit}
            height={7}
            size={5}
            stretch
            touchableOpacity>
            {isSubmitting ? (
              <AppSpinner color="white" />
            ) : (
              <AppText color="white">{I18n.t('ok')}</AppText>
            )}
          </AppButton>
        </AppView>
      );
    },
    [],
  );

  const onSubmit = useCallback(
    async ({payment_type}, {setSubmitting}) => {
      setSubmitting(false);
      hide();
      AppNavigation.push({
        name: 'onlinePayment',
        passProps: {
          payment_url:
            payment_type === 'MADA'
              ? `http://t5awy.com/en/mada-index/${request_id}`
              : `http://t5awy.com/en/credit-index/${request_id}`,
        },
      });
    },
    [hide, request_id],
  );
  return (
    <AppModal
      animationIn="bounceIn"
      animationOut="bounceOut"
      isVisible={isVisible}
      backdropDissmiss
      closeable
      {...{changeState}}
      {...rest}>
      <AppForm
        schema={{
          payment_type: 'MADA',
        }}
        render={renderContent}
        {...{onSubmit}}
      />
    </AppModal>
  );
});
