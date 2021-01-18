import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class ContactUs {
  constructor() {
    this.contactUsSourceToken = axios.CancelToken.source();
  }

  send = async data => {
    try {
      const res = await axios.post(`contacts`, data, {
        cancelToken: this.contactUsSourceToken.token,
      });
      if(res && res.status===204){
        return true;
      }else{
        return false
      }

    } catch (error) {
      console.log('error', error.response);
      if (axios.isCancel(error)) {
        throw new ApiErrorException(ApiErrorTypes.CANCEL, 'api-cancel');
      } else if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          'ui-error-happened',
        );
      }
    }
  };

  cancelContactUs = () => {
    this.contactUsSourceToken.cancel();
  };
}
