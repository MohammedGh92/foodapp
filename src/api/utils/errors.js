export class ApiErrorTypes {
  static CONNECTION_ERROR = 'CONNECTION_ERROR';
  static GENERAL_ERROR = 'GENERAL_ERROR';
  static CANCEL = 'CANCEL';
}

export class ApiErrorException {
  constructor(type, msg) {
    (this.type = type), (this.msg = msg);
  }
}

export class ApiActivationErrorException {
  constructor(type, isActive) {
    this.type = type;
    this.isActive = isActive;
  }
}
