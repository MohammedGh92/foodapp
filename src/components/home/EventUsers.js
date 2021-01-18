import React, {useMemo} from 'react';
import {AppImage, AppView, AppText} from '../../common';
import {StyleSheet} from 'react-native';
import {APP_BASE_URL} from '../../api/utils/urls';
const EventUsers = ({participants}) => {
  const users = participants.slice(0, 2);
  const isPlusViewVisible = useMemo(() => {
    return participants.length - users.length > 0;
  }, [participants, users]);
  let left = 0;
  return (
    <AppView height={5} width={20}>
      {users.map((item, indx) => {
        left = indx * 15;
        return (
          <AppImage
            key={item.id}
            style={[styles.circleContainer, {right: left}]}
            borderColor="white"
            borderWidth={1}
            source={{uri: `${APP_BASE_URL}${item.image}`}}
            circleRadius={10}
          />
        );
      })}
      {isPlusViewVisible && (
        <AppView
          backgroundColor="#29235C"
          style={[styles.circleContainer, {right: left + 15}]}
          circleRadius={10}
          center>
          <AppText color="white">+{participants.length - users.length}</AppText>
        </AppView>
      )}
    </AppView>
  );
};

const styles = StyleSheet.create({
  circleContainer: {position: 'absolute'},
});
export default EventUsers;
