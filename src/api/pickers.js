import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class Pickers {
  getCountries = async () => {
    try {
      const res = await axios.get('countries');
      return res.data;
    } catch (error) {
      console.log('countries  error', error.response);
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
  getStates = async (selectedCountry) => {
    try {
      const res = await axios.get(`states/${selectedCountry}`);
      console.log(res, 'getStates', selectedCountry + '');
      return res.data;
    } catch (error) {
      console.log('countries  error', error.response);
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
  getCitites = async (selectedState) => {
    try {
      const res = await axios.get(`cities/${selectedState}`);
      return res.data;
    } catch (error) {
      console.log('countries  error', error.response);
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

  getEventTypes = async () => {
    try {
      const res = await axios.get('event-types');
      console.log(res);
      return res.data;
    } catch (error) {
      console.log('event-types  error', error.response);
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

  getTripTypes = async () => {
    try {
      const res = await axios.get('trip-types');
      console.log(res);
      return res.data;
    } catch (error) {
      console.log('trip-types  error', error.response);
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

  getTargetGroups = async () => {
    try {
      const res = await axios.get('target-groups');
      console.log(res);
      return res.data;
    } catch (error) {
      console.log('target-groups  error', error.response);
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

  getCarTypes = async () => {
    try {
      const res = await axios.get('car-types');
      console.log(res);
      return res.data;
    } catch (error) {
      console.log('car-types  error', error.response);
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
