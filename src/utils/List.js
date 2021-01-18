import {refreshList} from '../actions/list';
import store from '../store/store';

export const getResponseTransformed = (response) => {
  const {meta, data} = response.data;
  console.log(data, response);
  return {
    data: data || [],
    pageCount: Math.ceil(meta?.total / meta?.per_page),
    page: meta?.current_page,
  };
};

export const refreshTravelsList = () =>
  store.dispatch(refreshList('travelsList'));

export const refreshHomeList = () => store.dispatch(refreshList('homeList'));
export const refreshNotificationsList = () =>
  store.dispatch(refreshList('notificationsList'));

export const refreshTripDetails = () =>
  store.dispatch(refreshList('tripDetails'));

export const refreshPostsList = () => store.dispatch(refreshList('postsList'));
