import {SideMenuApi} from '../api';
import {showError} from '../common';
import {dataToFormData} from './utils/dataFormation';
export default class SideMenu {
  constructor() {
    this.sideMenuApi = new SideMenuApi();
  }

  createRating = async (data) => {
    let success = true;
    try {
      const formData = new FormData();
      data.forEach((element, index) => {
        Object.keys(element).forEach((key) =>
          formData.append(`ratings[${index}][${key}]`, element[`${key}`]),
        );
      });
      console.log(formData);
      const res = await this.sideMenuApi.createRating(formData);
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  createReport = async (data) => {
    let success = true;
    try {
      const res = await this.sideMenuApi.createReport(dataToFormData(data));
    } catch (error) {
      console.log(error);
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
