import ApiContactUs from '../api/contactUs';

export default class ContactUs {
  constructor() {
    this.apiContactUs = new ApiContactUs();
  }

  send = async data => {
    const res = await this.apiContactUs.send(data);
    return res;
  };

  cancelSend = () => {
    this.apiContactUs.cancelContactUs();
  };
}
