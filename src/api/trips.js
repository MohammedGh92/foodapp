import axios from 'axios';
import {dataToFormData} from '../repo/utils/dataFormation';
import store from '../store/store';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class Trips {
  createTrip = async (data) => {
    console.log(data, 'trips data');
    try {
      const res = await axios.post('trips', data);
      console.log(res, 'create trips');
      return res.data;
    } catch (error) {
      console.log(
        'trips  error',
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

  joinTrip = async (data, trip_id) => {
    try {
      const res = await axios.post(`trips/${trip_id}/join`, data);
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

  getTrip = async (trip_id) => {
    try {
      const res = await axios.get(`trips/${trip_id}`);
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

  acceptJoin = async (trip_id, user_id) => {
    const data = dataToFormData({
      user_id: user_id,
    });
    try {
      const res = await axios.post(`trips/${trip_id}/accept`, data);
      console.log(res, 'acceptJoin event');
      return res.data;
    } catch (error) {
      console.log(
        'acceptJoin  error',
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
  rejectJoin = async (trip_id, user_id) => {
    const data = dataToFormData({
      user_id: user_id,
    });
    try {
      const res = await axios.post(`trips/${trip_id}/reject`, data);
      console.log(res, 'rejectJoin event');
      return res.data;
    } catch (error) {
      console.log(
        'rejectJoin  error',
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
  cancelJoin = async (trip_id) => {
    const user = store.getState().auth.userData?.user;
    const data = dataToFormData({
      user_id: user.id,
    });
    try {
      const res = await axios.post(`trips/${trip_id}/cancel-join`, data);
      console.log(res, 'cancelJoin event');
      return res.data;
    } catch (error) {
      console.log(
        'cancelJoin  error',
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

  cancelTrip = async (trip_id) => {
    const user = store.getState().auth.userData?.user;
    const data = dataToFormData({
      user_id: user.id,
    });
    try {
      const res = await axios.delete(`trips/${trip_id}`);
      console.log(res, 'cancelTrip event');
      return res.data;
    } catch (error) {
      console.log(
        'cancelTrip  error',
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

  startTrip = async (trip_id) => {
    try {
      const res = await axios.get(`trips/${trip_id}/start`);
      console.log(res, 'startTrip event');
      return res.data;
    } catch (error) {
      console.log(
        'startTrip  error',
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

  finishTrip = async (trip_id) => {
    try {
      const res = await axios.get(`trips/${trip_id}/finish`);
      console.log(res, 'finishTrip event');
      return res.data;
    } catch (error) {
      console.log(
        'finishTrip  error',
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
