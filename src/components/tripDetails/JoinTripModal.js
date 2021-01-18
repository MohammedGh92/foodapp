import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AppModal,
  AppView,
  AppButton,
  AppScrollView,
  AppText,
  CheckBoxGroup,
  AppCheckBox,
  AppNavigation,
  AppForm,
  AppInput,
} from '../../common';
import useModal from '../useModal';
import {joinTripValidationSchema} from '../../validation/trips';
import I18n from 'react-native-i18n';
import {StyleSheet} from 'react-native';
import TermsBtn from '../TermsBtn';
import Picker from '../Picker';
import {useSelector} from 'react-redux';
import LoadingView from '../LoadingView';
import {TripsRepo} from '../../repo';

const tripsRepo = new TripsRepo();

export default forwardRef(
  ({stop_points, trip_id, setIsJoined, deviation_time, ...rest}, ref) => {
    const [isVisible, changeState, show, hide] = useModal(ref);
    const [istermsAccepted, setIsTermsAccepted] = useState(false);

    const user_id = useSelector((state) => state.auth.userData?.user?.id);
    const renderContent = useCallback(
      ({injectFormProps, isSubmitting, setFieldValue, handleSubmit}) => {
        return (
          <AppView height={100} width={100} borderRadius={10}>
            <AppView
              padding={10}
              height={50}
              backgroundColor="white"
              style={styles.container}>
              <AppScrollView flex stretch>
                <AppView stretch>
                  <AppText size={8} color="secondary">
                    {I18n.t('join-a-trip')}
                  </AppText>

                  <Picker
                    touchableOpacity
                    title={I18n.t('stop-points')}
                    {...injectFormProps('stop_point_id')}
                    {...{setFieldValue}}
                    {...(schema.current.stop_point_id !== ''
                      ? {
                          initialValue: {
                            label:
                              stop_points[
                                stop_points.findIndex(
                                  (val) =>
                                    val.id === schema.current.stop_point_id,
                                )
                              ].name,
                            id: schema.current.stop_point_id,
                          },
                        }
                      : {})}
                    label="name"
                    value="id"
                    data={stop_points}
                  />
                  <AppInput
                    number
                    maxLength={2}
                    marginVertical={5}
                    placeholder={I18n.t('deviation_time')}
                    {...injectFormProps('minutes_number')}
                  />

                  <AppView stretch row marginVertical={10}>
                    <CheckBoxGroup
                      {...injectFormProps('istermsAccepted')}
                      onChange={(name, value) => {
                        setFieldValue(name, value);
                        setIsTermsAccepted((prev) => !prev);
                      }}>
                      <AppCheckBox touchableOpacity label={I18n.t('accept')} />
                    </CheckBoxGroup>
                    <TermsBtn
                      pushTerms={() => {
                        hide();
                        AppNavigation.push({
                          name: 'termsAndConditions',
                          passProps: {
                            onPop: show,
                          },
                        });
                      }}
                      color="foreground"
                    />
                  </AppView>
                </AppView>
              </AppScrollView>
              <AppButton
                disabled={!istermsAccepted}
                onPress={handleSubmit}
                touchableOpacity
                stretch
                title={I18n.t('ok')}
                height={7}
                processing={isSubmitting}
                marginVertical={5}
              />
            </AppView>
          </AppView>
        );
      },
      [hide, istermsAccepted, show, stop_points],
    );

    const onSubmit = useCallback(
      async ({istermsAccepted, ...values}, {setSubmitting}) => {
        const res = await tripsRepo.joinTrip(values);
        if (res) {
          hide(() => setIsTermsAccepted(false));
          setIsJoined(true);
        }
        setSubmitting(false);
      },
      [hide, setIsJoined],
    );

    const schema = useRef({
      stop_point_id: '',
      minutes_number: '',
      user_id,
      trip_id,
      istermsAccepted: '',
    });

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        backdropDissmiss
        closeable
        {...{changeState}}
        // changeState={(v) => {
        //   changeState(v);
        //   setIsTermsAccepted(false);
        // }}
        {...rest}>
        <AppForm
          validationSchema={(values) =>
            joinTripValidationSchema(values, deviation_time)
          }
          schema={schema.current}
          render={renderContent}
          {...{onSubmit}}
        />
      </AppModal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
