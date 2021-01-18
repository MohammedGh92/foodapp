import * as yup from 'yup';
import I18n from 'react-native-i18n';
var nameRegex = /^[a-zA-Z\s]+$/;
export default class Auth {
  signIn = (validationSchema = values =>
    yup.object().shape({
      username: yup
        .string()
        .trim(I18n.t("mustn't-has-space"))
        .strict(true)
        .required(I18n.t('validation-error-required'))
        // .test('mobile', I18n.t('enter-valid-phone-number'), () =>
        //   Number.isInteger(+values.mobile) && !(values.mobile).includes(".")
        // )
        .min(5, `${I18n.t('must-be-atleast')} 5 ${I18n.t('char')}`)
        .max(15, `${I18n.t('must-be-atmost')} 15 ${I18n.t('char')}`)
      ,
      password: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .min(6, `${I18n.t('must-be-atleast')} 6 ${I18n.t('char')}`),
    }));
  completeData = (validationSchema = values =>
    yup.object().shape({
      // mobile: yup
      //   .string()
      //   .required(I18n.t('validation-error-required'))
      //   .test('mobile', I18n.t('enter-valid-phone-number'), () =>
      //     Number.isInteger(+values.mobile) && !(values.mobile).includes(".")
      //   )
      //   .min(5, `${I18n.t('must-be-atleast')} 5 ${I18n.t('numbers')}`)
      //   .max(15, `${I18n.t('must-be-atmost')} 15 ${I18n.t('numbers')}`)
      // ,
      country_id: yup.string().required(I18n.t('validation-error-required')),
    }));
  signUp = (validationSchema = values =>
    yup.object().shape({
      mobile: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .trim(I18n.t("mustn't-has-space"))
        .strict(true)
        // .test('mobile', I18n.t('enter-valid-phone-number'), () =>
        //   Number.isInteger(+values.mobile) && !(values.mobile).includes(".")
        // )
        .min(5, `${I18n.t('must-be-atleast')} 5 ${I18n.t('char')}`)
        .max(25, `${I18n.t('must-be-atmost')} 25 ${I18n.t('char')}`)
      ,
      password: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .min(6, `${I18n.t('must-be-atleast')} 6 ${I18n.t('char')}`),
      username: yup
        .string()
        .trim(I18n.t("mustn't-has-space"))
        .strict(true)
        .required(I18n.t('validation-error-required'))
        // .test('mobile', I18n.t('enter-valid-phone-number'), () =>
        //   Number.isInteger(+values.mobile) && !(values.mobile).includes(".")
        // )
        .min(5, `${I18n.t('must-be-atleast')} 5 ${I18n.t('char')}`)
        .max(15, `${I18n.t('must-be-atmost')} 15 ${I18n.t('char')}`)
      ,
      email: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .email(`${I18n.t('invalid')}`),
    }));
  forgetPassword = (validationSchema = values =>
    yup.object().shape({
      mobile: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .test('mobile', I18n.t('enter-valid-phone-number'), () =>
          Number.isInteger(+values.mobile) && !(values.mobile).includes(".")

        )
        .min(5, `${I18n.t('must-be-atleast')} 5 ${I18n.t('numbers')}`)
        .max(15, `${I18n.t('must-be-atmost')} 15 ${I18n.t('numbers')}`)
      ,
    }));
  confirmPassword = (validationSchema = values =>
    yup.object().shape({
      password: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .min(6, `${I18n.t('must-be-atleast')} 6 ${I18n.t('char')}`),
      password_confirmation: yup
        .string()
        .required(I18n.t('validation-error-required'))
        .oneOf([values.password, ''], I18n.t('signup-confirmPassword-invalid'))
        .min(6, `${I18n.t('must-be-atleast')} 6 ${I18n.t('char')}`),
    }));
}
