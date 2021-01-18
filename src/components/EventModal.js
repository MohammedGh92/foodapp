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
import {EventsRepo} from '../repo';
import ActionItem from './home/ActionItem';
import JoinTrip from './home/JoinTrip';
import JoinEvent from './home/JoinEvent';
import {refreshHomeList} from '../utils/List';

const eventsRepo = new EventsRepo();

export default forwardRef(
  ({event_id, user_id, event_country, ...rest}, ref) => {
    const [isVisible, changeState, show, hide] = useModal(ref);
    const pushAddTrip = useCallback(() => {
      hide();
      AppNavigation.push({
        name: 'addTrip',
        passProps: {
          event_id,
          event_country,
        },
      });
    }, [event_country, hide, event_id]);

    const pushReportAbuse = useCallback(() => {
      hide();
      AppNavigation.push({
        name: 'report',
        passProps: {
          event_id,
          user_id,
          //TODO:user id
        },
      });
    }, [hide, user_id, event_id]);
    const hideEvent = useCallback(async () => {
      const res = await eventsRepo.hideEvent(event_id);
      if (res) {
        hide();
        refreshHomeList();
      }
    }, [event_id, hide]);

    const renderContent = useCallback(() => {
      return (
        <AppView
          marginTop={95}
          height={70}
          paddingVertical={10}
          backgroundColor="white"
          width={100}>
          <AppScrollView stretch flexGrow>
            <AppView stretch>
              <ActionItem
                touchableOpacity
                marginBottom={5}
                onPress={pushAddTrip}
                name="plus-square"
                type="feather"
                title={I18n.t('create-trip')}
              />
              <JoinTrip touchableOpacity marginBottom={5} />
              <JoinEvent
                touchableOpacity
                onSuccess={hide}
                {...{eventsRepo}}
                marginBottom={5}
              />
              <ActionItem
                touchableOpacity
                marginBottom={5}
                // onPress={pushAddTrip}
                name="facebook-messenger"
                type="material-community"
                title={I18n.t('posts')}
              />
              <ActionItem
                touchableOpacity
                marginBottom={5}
                onPress={pushReportAbuse}
                name="md-bug-outline"
                type="ion"
                title={I18n.t('report-abuse')}
              />
              <ActionItem
                touchableOpacity
                onPress={hideEvent}
                name="eye-off"
                type="feather"
                title={I18n.t('hide-event')}
              />
            </AppView>
          </AppScrollView>
        </AppView>
      );
    }, [hide, pushReportAbuse, hideEvent, pushAddTrip]);

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
  },
);
