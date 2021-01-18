import {Navigation} from 'react-native-navigation';
import {refreshList} from '../actions/list';
import {SELECT_TAB} from '../actions/types';
import {AppNavigation} from '../common';
import store from '../store/store';
import {refreshTravelsList} from './List';

export const navigateToNotificationDetails = (type, id) => {
  const pushEvent = () => {
    AppNavigation.push({
      name: 'eventDetails',
      passProps: {
        event_id: id,
      },
    });
  };
  const pushTrip = () => {
    AppNavigation.push({
      name: 'tripDetails',
      passProps: {
        trip_id: id,
      },
    });
  };
  if (type === 'JoinTrip') {
    refreshTravelsList();
    const currentTabIndex = 3;
    store.dispatch({type: SELECT_TAB, payload: 3});
    Navigation.mergeOptions(AppNavigation.currentComponentId, {
      bottomTabs: {
        currentTabIndex,
      },
    });
  } else if (type.includes('Trip')) {
    pushTrip();
  } else if (type.includes('Event')) {
    pushEvent();
  }
};

export const refreshDetails = (type) => {
  if (type.includes('Trip')) {
    store.dispatch(refreshList('tripDetails'));
  } else if (type.includes('Event')) {
    store.dispatch(refreshList('eventDetails'));
  }
};
