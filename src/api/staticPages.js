import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class StaticPages {
  getStaticPage = async pageName => {
    try {
      const res = await axios.get(pageName);
      console.log('getStaticPagesss', res);

      return res.data.data;
    } catch (error) {
      console.log(error, 'getStaticPage error');
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error,
        );
      }
    }
  };
}
