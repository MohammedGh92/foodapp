import React, {useCallback, useRef, useState} from 'react';
import I18n from 'react-native-i18n';
import {
  AppView,
  AppText,
  AppForm,
  AppButton,
  AppInput,
  AppTextArea,
  showSuccess,
  showError,
  AppSpinner,
} from '../../common';
import TypesPicker from './TypesPicker';
import ContactUsRepo from '../../repo/contactUs';
import {ApiErrorTypes} from '../../api/utils/errors';
import * as yup from 'yup';

const ContactUsForm = () => {
  const contactUsRepo = new ContactUsRepo();

  const renderContent = useCallback(
    ({injectFormProps, isSubmitting, setFieldValue, handleSubmit}) => {
      return (
        <AppView stretch marginTop={10}>
          <AppText bold size={7} color="#29235C" marginBottom={10}>
            {I18n.t('did-you-face-problem-or-has-question')}
          </AppText>
          <AppInput
            marginVertical={5}
            {...injectFormProps('name')}
            placeholder={I18n.t('your-name')}
            elevation={1}
          />
          <AppInput
            phone
            {...injectFormProps('phone')}
            placeholder={I18n.t('phone-number')}
            elevation={1}
          />
          <AppInput
            email
            marginVertical={5}
            {...injectFormProps('email')}
            placeholder={I18n.t('email')}
            elevation={1}
          />
          <AppInput
            marginVertical={5}
            {...injectFormProps('subject')}
            placeholder={I18n.t('title')}
            elevation={1}
          />
          <TypesPicker {...{setFieldValue}} {...{injectFormProps}} />
          <AppTextArea
            marginTop={5}
            {...injectFormProps('content')}
            placeholder={I18n.t('the-message')}
            elevation={1}
            height={20}
            backgroundColor="#fff"
            borderWidth={0.2}
          />
          <AppButton
            processing={isSubmitting}
            onPress={() => {
              if (!isSubmitting) {
                handleSubmit();
              }
            }}
            stretch
            marginVertical={10}>
            {isSubmitting ? (
              <AppSpinner color="white" />
            ) : (
              <AppText color="white">{I18n.t('send')}</AppText>
            )}
          </AppButton>
        </AppView>
      );
    },
    [],
  );

  const onSubmit = useCallback(async (values, {setSubmitting, resetForm}) => {
    try {
      const res = await contactUsRepo.send(values);
      if (res) {
        setSubmitting(false);
        resetForm();
        showSuccess(I18n.t('send-success'));
      }
    } catch (apiErrorException) {
      console.log('apiErrorException', apiErrorException);
      if (apiErrorException.type === ApiErrorTypes.CONNECTION_ERROR) {
        showError(I18n.t(apiErrorException.msg));
      } else {
        showError(I18n.t(apiErrorException.msg));
      }
    } finally {
      setSubmitting(false);
    }
  }, []);
  const _getValidationSchema = (values) =>
    yup.object().shape({
      name: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .trim(I18n.t('validation-error-required'))
        .min(3, `${I18n.t('must-be-atleast')} 3 ${I18n.t('char')}`)
        .max(20, `${I18n.t('must-be-atmost')} 20 ${I18n.t('char')}`),
      // type: yup
      //   .string()
      //   .required(I18n.t('validation-error-required')),
      subject: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .trim(I18n.t('validation-error-required'))
        .min(3, `${I18n.t('must-be-atleast')} 3 ${I18n.t('char')}`)
        .max(20, `${I18n.t('must-be-atmost')} 20 ${I18n.t('char')}`),
      content: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .min(3, `${I18n.t('must-be-atleast')} 3 ${I18n.t('char')}`)
        .max(2000, `${I18n.t('must-be-atmost')} 2000 ${I18n.t('char')}`),
      email: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .email(I18n.t('in-valid-email')),
      phone: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .test(
          'phone',
          I18n.t('enter-valid-phone-number'),
          () => Number.isInteger(+values.phone) && !values.phone.includes('.'),
        )
        .min(5, `${I18n.t('must-be-atleast')} 5 ${I18n.t('num')}`)
        .max(15, `${I18n.t('must-be-atmost')} 15 ${I18n.t('num')}`),
    });

  return (
    <AppView centerX paddingHorizontal={10} flex stretch>
      <AppForm
        validationSchema={_getValidationSchema}
        schema={{
          name: '',
          phone: '',
          email: '',
          // type: '',
          subject: '',
          content: '',
        }}
        render={renderContent}
        {...{onSubmit}}
      />
    </AppView>
  );
};

export default ContactUsForm;
