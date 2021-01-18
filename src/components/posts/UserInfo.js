import React, {useRef} from 'react';
import {AppIcon, AppImage, AppText, AppView, TouchableView} from '../../common';
import I18n from 'react-native-i18n';
import {useSelector} from 'react-redux';
import test from '../../assets/imgs/camera.png';
import {APP_BASE_URL} from '../../api/utils/urls';
import PostModal from '../PostModal';
const UserInfo = ({data}) => {
  const postModalRef = useRef();
  const userData = useSelector((state) => state.auth.userData);
  const isPostMine = useRef(data?.user?.id === userData?.user?.id);
  return (
    <AppView spaceBetween left row stretch>
      <AppView row>
        <AppImage
          elevation={1}
          source={{uri: `${APP_BASE_URL}${data.user.image}`}}
          circleRadius={10}
        />
        <AppView marginHorizontal={5}>
          <AppText bold size={7} color="#433E70">
            {data.user.name}
          </AppText>
          <AppText color="grey" marginTop={2}>
            {data.created_at}
          </AppText>
        </AppView>
      </AppView>
      {isPostMine.current && (
        <TouchableView paddingHorizontal={5} paddingBottom={5}>
          <AppIcon
            onPress={() => postModalRef.current.show()}
            size={10}
            color="secondary"
            type="material-community"
            name="dots-vertical"
          />
        </TouchableView>
      )}
      <PostModal data={data} ref={postModalRef} />
    </AppView>
  );
};

export default UserInfo;
