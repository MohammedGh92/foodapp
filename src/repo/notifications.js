import {NotificationsApi} from '../api';
import {showError} from '../common';
import store from '../store/store';
import {SET_UNSEEN_COUNT} from '../actions/types';
export default class Notifications {
  constructor() {
    this.notificationsApi = new NotificationsApi();
  }

  readNotif = async (notificationId) => {
    let success = true;
    try {
      const res = await this.notificationsApi.readNotif(notificationId);
      store.dispatch({type: SET_UNSEEN_COUNT, payload: res.unreadCount});
      console.log(res, 'unreadCount');
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  getUnReadCounter = async () => {
    let success = true;
    try {
      const res = await this.notificationsApi.getUnReadCounter();
      store.dispatch({type: SET_UNSEEN_COUNT, payload: res.unreadCount});
      console.log(res, 'unreadCount');
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
