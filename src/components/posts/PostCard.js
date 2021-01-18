import React from 'react';
import {AppText, AppView, TouchableView} from '../../common';
import PostInfo from './PostInfo';
import UserInfo from './UserInfo';
const PostCard = ({data}) => {
  return (
    <AppView stretch margin={5} padding={1}>
      <UserInfo {...{data}} />
      <PostInfo {...{data}} />
    </AppView>
  );
};

export default PostCard;
