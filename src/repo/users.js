import {UsersApi} from '../api';
import {showError} from '../common';
import {AppendImgValue, dataToFormData} from './utils/dataFormation';
export default class Users {
  constructor() {
    this.usersApi = new UsersApi();
  }

  getProfileData = async (userId) => {
    let data = true;
    try {
      data = await this.usersApi.getProfileData(userId);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  updateProfileData = async ({image, ...rest}) => {
    const formData = dataToFormData({...rest});
    AppendImgValue(formData, {name: 'image', value: image});
    let data = true;
    try {
      data = await this.usersApi.updateProfileData(formData);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
  getHobbies = async () => {
    let data = true;
    try {
      data = await this.usersApi.getHobbies();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  updateHobbies = async (values) => {
    let data = true;
    try {
      const formData = [];
      Object.keys(values).forEach((key) => {
        formData.push({hobby_id: key, hobby_option_id: values[`${key}`]});
      });

      const res = await this.usersApi.updateHobbies({hobbies: formData});
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  updateBank = async (values) => {
    let data = true;
    try {
      const res = await this.usersApi.updateBank(values);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  updateCar = async ({image, ...rest}) => {
    let data = true;
    try {
      const formData = dataToFormData({...rest});
      AppendImgValue(formData, {name: 'image', value: image});
      const res = await this.usersApi.updateCar(formData);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
  changeLang = async (data) => {
    let success = true;
    try {
      const res = await this.usersApi.changeLang(dataToFormData(data));
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
