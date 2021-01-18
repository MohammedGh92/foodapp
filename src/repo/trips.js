import {TripsApi} from '../api';
import {showError} from '../common';
import {dataToFormData} from './utils/dataFormation';
export default class Trips {
  constructor() {
    this.tripsApi = new TripsApi();
  }

  createTrip = async ({stop_points, ...values}) => {
    let success = true;
    try {
      const data = dataToFormData(values);
      stop_points.forEach((element, index) => {
        Object.keys(element).forEach((key) =>
          data.append(`stop_points[${index}][${key}]`, element[`${key}`]),
        );
      });
      const res = await this.tripsApi.createTrip(data);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  joinTrip = async ({trip_id, ...values}) => {
    let success = true;
    try {
      const res = await this.tripsApi.joinTrip(dataToFormData(values), trip_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  getTrip = async (trip_id) => {
    let data = true;
    try {
      data = await this.tripsApi.getTrip(trip_id);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  acceptJoin = async (trip_id, user_id) => {
    let success = true;
    try {
      const res = await this.tripsApi.acceptJoin(trip_id, user_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
  rejectJoin = async (trip_id, user_id) => {
    let success = true;
    try {
      const res = await this.tripsApi.rejectJoin(trip_id, user_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
  cancelJoin = async (trip_id) => {
    let success = true;
    try {
      const res = await this.tripsApi.cancelJoin(trip_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  cancelTrip = async (trip_id) => {
    let success = true;
    try {
      const res = await this.tripsApi.cancelTrip(trip_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  startTrip = async (trip_id) => {
    let success = true;
    try {
      const res = await this.tripsApi.startTrip(trip_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  finishTrip = async (trip_id) => {
    let success = true;
    try {
      const res = await this.tripsApi.finishTrip(trip_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
