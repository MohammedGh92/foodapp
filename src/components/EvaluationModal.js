import React, {forwardRef, useCallback, useEffect, useRef} from 'react';

import useModal from './useModal';
import I18n from 'react-native-i18n';
import {
  AppModal,
  AppView,
  AppNavigation,
  AppText,
  AppButton,
  AppScrollView,
  AppImage,
  AppInput,
  AppStarRating,
} from '../common';
import {APP_BASE_URL} from '../api/utils/urls';
import {SideMenuRepo} from '../repo';
import usePost from './usePost';
import {useSelector} from 'react-redux';

const sideMenuRepo = new SideMenuRepo();
const MemberITem = ({name, image, index, user_id, formData}) => {
  useEffect(() => {
    formData.current[`${index}`] = {
      user_id,
    };
  }, [user_id, formData, index]);
  const setFormValue = useCallback(
    (key, value) => {
      formData.current[`${index}`][`${key}`] = value;
      console.log(formData.current);
    },
    [formData, index],
  );
  return (
    <AppView stretch center marginVertical={5}>
      <AppView center marginVertical={3}>
        <AppImage
          source={{uri: image}}
          borderRadius={5}
          equalSize={15}
          backgroundColor="red"
        />
        <AppText marginVertical={2} color="secondary">
          {name}
        </AppText>
      </AppView>
      <AppStarRating
        selectedStar={(rate) => setFormValue('rate', rate)}
        touchableOpacity
        size={15}
      />
      <AppInput
        onChange={(text) => setFormValue('comment', text)}
        noBorder
        elevation={0}
        borderBottomWidth={0.5}
        borderColor="grey"
        stretch
        placeholder={I18n.t('add-comment')}
      />
    </AppView>
  );
};

export default forwardRef(({evaluees, trip_id, ...rest}, ref) => {
  const rated_by = useSelector((state) => state.auth.userData?.user?.id);
  const isTripMine = useRef(evaluees[0]?.id === rated_by);
  const formData = useRef({});
  const [isVisible, changeState, hide] = useModal(ref);

  const createRating = useCallback(async () => {
    const data = [];
    Object.keys(formData.current).forEach((key) => {
      const tempVal = {
        rated_by,
        trip_id,
      };

      if (formData.current[`${key}`].rate) {
        tempVal.rate = formData.current[`${key}`].rate;
      }
      if (formData.current[`${key}`].user_id) {
        tempVal.user_id = formData.current[`${key}`].user_id;
      }
      if (formData.current[`${key}`].comment) {
        tempVal.comment = formData.current[`${key}`].comment;
      }
      data.push(tempVal);
    });
    const res = await sideMenuRepo.createRating(data);

    return res;
  }, [rated_by, trip_id]);
  const onSucess = useCallback(() => {
    hide();
    AppNavigation.navigateToHome();
  }, [hide]);
  const {isLoading, post: onCreateRating} = usePost(createRating, onSucess);
  const renderContent = () => {
    return (
      <AppView
        height={90}
        padding={5}
        backgroundColor="white"
        width={90}
        centerX
        borderRadius={10}>
        <AppScrollView stretch centerX flexGrow>
          <AppText color="secondary" size={9}>
            {I18n.t('eva-trip')}
          </AppText>
          <AppText size={6}>
            {I18n.t(isTripMine.current ? 'eva-members' : 'rate-driver')}
          </AppText>
          {evaluees.map((item, index) => (
            <MemberITem
              user_id={item.id}
              {...{index}}
              {...{formData}}
              name={item.name}
              image={`${APP_BASE_URL}${item.image}`}
            />
          ))}
        </AppScrollView>
        <AppButton
          processing={isLoading}
          onPress={onCreateRating}
          title={I18n.t('send')}
          marginVertical={5}
          stretch
          touchableOpacity
        />
      </AppView>
    );
  };

  return (
    <AppModal
      animationIn="bounceIn"
      animationOut="bounceOut"
      isVisible={isVisible}
      changeState={(v) => {
        changeState(v);
        AppNavigation.navigateToHome();
      }}
      {...rest}>
      {renderContent()}
    </AppModal>
  );
});
