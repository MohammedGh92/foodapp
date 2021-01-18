import {PickersApi} from '../api';
import {showError} from '../common';
export default class Pickers {
  constructor() {
    this.pickersApi = new PickersApi();
  }

  getCountries = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getCountries();
      console.log(data, 'dagetCountriesta');
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
  getStates = async (selectedCountry) => {
    let data = true;
    try {
      data = await this.pickersApi.getStates(selectedCountry);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getCitites = async (selectedState) => {
    let data = true;
    try {
      data = await this.pickersApi.getCitites(selectedState);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getEventTypes = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getEventTypes();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
  getTripTypes = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getTripTypes();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getTargetGroups = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getTargetGroups();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  getCarTypes = async () => {
    let data = true;
    try {
      data = await this.pickersApi.getCarTypes();
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };
}
