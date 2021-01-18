import {PostsApi} from '../api';
import {showError} from '../common';
import {dataToFormData, AppendImgValue} from './utils/dataFormation';
export default class Posts {
  constructor() {
    this.postsApi = new PostsApi();
  }

  createPost = async ({images, ...values}, event_id) => {
    let success = true;
    try {
      const data = dataToFormData(values);
      console.log(images);
      if (images) {
        images.forEach((element) => {
          AppendImgValue(data, {name: 'images[]', value: element});
        });
      }

      const res = await this.postsApi.createPost(data, event_id);
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  editPost = async ({images, ...values}, post_id) => {
    let success = true;
    try {
      const data = dataToFormData(values);
      console.log(images);
      if (images) {
        images.forEach((element) => {
          AppendImgValue(data, {name: 'images[]', value: element});
        });
      }

      const res = await this.postsApi.editPost(data, post_id);
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
  deletePost = async (post_id) => {
    let success = true;
    try {
      const res = await this.postsApi.deletePost(post_id);
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
