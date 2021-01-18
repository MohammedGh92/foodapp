import React, {forwardRef, useCallback} from 'react';
import {
  AppModal,
  AppView,
  AppText,
  AppScrollView,
  AppNavigation,
} from '../common';
import useModal from './useModal';
import I18n from 'react-native-i18n';
import {PostsRepo} from '../repo';
import ActionItem from './home/ActionItem';
import {refreshPostsList} from '../utils/List';
import usePost from './usePost';

const postsRepo = new PostsRepo();

export default forwardRef(({data, ...rest}, ref) => {
  const [isVisible, changeState, show, hide] = useModal(ref);
  const pushEdit = useCallback(() => {
    hide();
    AppNavigation.push({
      name: 'editPost',
      passProps: {
        data,
      },
    });
  }, [data, hide]);

  const deletePost = useCallback(async () => {
    const res = await postsRepo.deletePost(data.id);
    if (res) {
      hide();
    }
    return res;
  }, [data, hide]);
  const {isLoading: isDeleting, post: onDeletePost} = usePost(
    deletePost,
    refreshPostsList,
  );
  const renderContent = useCallback(() => {
    return (
      <AppView
        marginTop={230}
        height={25}
        paddingVertical={10}
        backgroundColor="white"
        width={100}>
        <AppScrollView stretch flexGrow>
          <AppView stretch>
            <ActionItem
              touchableOpacity
              marginBottom={5}
              onPress={pushEdit}
              name="edit"
              type="ant"
              title={I18n.t('edit')}
            />
            <ActionItem
              processing={isDeleting}
              touchableOpacity
              marginBottom={5}
              onPress={onDeletePost}
              name="delete"
              type="ant"
              title={I18n.t('delete')}
            />
          </AppView>
        </AppScrollView>
      </AppView>
    );
  }, [isDeleting, onDeletePost, pushEdit]);

  return (
    <AppModal
      animationIn="bounceIn"
      animationOut="bounceOut"
      isVisible={isVisible}
      backdropDissmiss
      closeable
      {...{changeState}}
      {...rest}>
      {renderContent()}
    </AppModal>
  );
});
