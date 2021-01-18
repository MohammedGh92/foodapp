import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class SideMenu {
  createRating = async (data) => {
    try {
      const res = await axios.post('ratings', data);
      console.log(res, 'createRating trips');
      return res.data;
    } catch (error) {
      console.log(
        'createRating  error',
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

  createReport = async (data) => {
    try {
      const res = await axios.post('reports', data);
      console.log(res, 'createReport');
      return res.data;
    } catch (error) {
      console.log(
        'createReport  error',
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
