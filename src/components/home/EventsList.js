import React, { useState, useRef, useCallback } from 'react';
import I18n from 'react-native-i18n';
import { AppView, AppText, AppInput, AppIcon, AppList, TouchableView } from '../../common';
import EventCard from './EventCard';
import { AuthRepo } from '../../repo';
import { BASE_URL } from '../../api/utils/urls';
import { getResponseTransformed } from '../../utils/List';
import { useSelector } from 'react-redux';
const authRepo = new AuthRepo();
const EventsList = () => {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef();
  const text = useRef('');
  const onChange = useCallback((val) => {
    text.current = val;
  }, []);

  const onSubmitEditing = useCallback((val) => {
    setKeyword(val);
  }, []);

  const homeList = useSelector((state) => state.list.homeList);
  const userData = useSelector((state) => state?.auth?.userData);
const justData = useSelector((state) => state?.auth?.justData);

  const OnClick = useCallback(
    async() => {
console.log('1');
      const res = await authRepo.setData();
    },
    [],
  );

  return (
    <AppView marginBottom={30} center stretch flex marginHorizontal={8}>
      <AppText onPress={() => OnClick()} bold size={10} marginVertical={5} color="white">
        {userData?.user?.name}
         Here Data:{justData?.data?.info.seed}
      </AppText>
      <AppInput
        returnKeyType="search"
        onChange={onChange}
        ref={inputRef}
        value={keyword}
        onSubmitEditing={onSubmitEditing}
        marginBottom={10}
        borderWidth={0}
        placeholder={I18n.t('search-here')}
        rightItems={
          <AppIcon
            onPress={() => {
              // inputRef.current.focus();
              onSubmitEditing(text.current);
            }}
            margin={5}
            name="search1"
            type="ant"
            size={10}
          />
        }
      />

      <AppList
        refreshControl={homeList}
        flex
        apiRequest={{
          url: `${BASE_URL}events?user_id=${userData?.user?.id}&name=${keyword}`,
        }}
        stretch
        rowRenderer={(data) => <EventCard {...{ data }} />}
      />
    </AppView>
  );
};

export default EventsList;
