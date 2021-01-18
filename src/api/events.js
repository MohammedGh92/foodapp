import axios from 'axios';
import {dataToFormData} from '../repo/utils/dataFormation';
import store from '../store/store';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class Events {
  createEvent = async (data) => {
    console.log(data, 'event data');
    try {
      const res = await axios.post('events/create', data);
      console.log(res, 'create event');
      return res.data;
    } catch (error) {
      console.log(
        'events/create  error',
        error.response,
        JSON.parse(JSON.stringify(error)),
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  joinEvent = async (event_id) => {
    try {
      const user = store.getState().auth.userData?.user;
      const data = dataToFormData({
        user_id: user.id,
      });
      const res = await axios.post(`events/${event_id}/join`, data);
      console.log(res, 'joinEvent event');
      return res.data;
    } catch (error) {
      console.log(
        'joinEvent  error',
        error.response,
        JSON.parse(JSON.stringify(error)),
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getEvent = async (event_id) => {
    try {
      const res = await axios.get(`events/${event_id}`);
      return res.data;
    } catch (error) {
      console.log('getEvent  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  hideEvent = async (event_id) => {
    try {
      const user = store.getState().auth.userData?.user;
      const data = dataToFormData({
        user_id: user.id,
      });
      const res = await axios.post(`events/${event_id}/hide`, data);
      console.log(res, 'hideEvent event');
      return res.data;
    } catch (error) {
      console.log(
        'hideEvent  error',
        error.response,
        JSON.parse(JSON.stringify(error)),
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
}
