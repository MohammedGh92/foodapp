import {EventsApi} from '../api';
import {showError} from '../common';
import {dataToFormData, AppendImgValue} from './utils/dataFormation';
export default class Events {
  constructor() {
    this.eventsApi = new EventsApi();
  }

  createEvent = async ({
    image,
    target_group_ids,
    event_type_ids,
    appointments,
    start_date,
    end_date,
    appointment_type,
    ...values
  }) => {
    let success = true;
    try {
      const data = dataToFormData(values);
      event_type_ids.forEach((element) => {
        data.append('event_type_ids[]', element);
      });
      target_group_ids.forEach((element) => {
        data.append('target_group_ids[]', element);
      });
      if (appointment_type === 'specific_days') {
        appointments.forEach((element) => {
          data.append('appointments[]', element);
        });
      } else {
        data.append('start_date', start_date);
        data.append('end_date', end_date);
      }
      data.append('appointment_type', appointment_type);
      AppendImgValue(data, {name: 'image', value: image});
      const res = await this.eventsApi.createEvent(data);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  joinEvent = async (event_id) => {
    let success = true;
    try {
      const res = await this.eventsApi.joinEvent(event_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };

  getEvent = async (event_id) => {
    let data = true;
    try {
      data = await this.eventsApi.getEvent(event_id);
    } catch (error) {
      showError(error.msg);
      data = false;
    } finally {
      return data;
    }
  };

  hideEvent = async (event_id) => {
    let success = true;
    try {
      const res = await this.eventsApi.hideEvent(event_id);
    } catch (error) {
      showError(error.msg);
      success = false;
    } finally {
      return success;
    }
  };
}
