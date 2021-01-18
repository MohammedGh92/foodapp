import axios from 'axios';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class Posts {
  createPost = async (data, event_id) => {
    console.log(data, 'event data');
    try {
      const res = await axios.post(`events/${event_id}/posts`, data);
      console.log(res, 'create createPost');
      return res.data;
    } catch (error) {
      console.log(
        'createPost error',
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
  editPost = async (data, post_id) => {
    console.log(data, 'event data');
    try {
      const res = await axios.post(`posts/${post_id}`, data);
      console.log(res, 'create createPost');
      return res.data;
    } catch (error) {
      console.log(
        'createPost error',
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

  deletePost = async (post_id) => {
    try {
      const res = await axios.delete(`posts/${post_id}`);
      console.log(res, 'deletePost');
      return res.data;
    } catch (error) {
      console.log(
        'deletePost error',
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
