import { error_code, error_msg } from "../constants.js";

const defaultError = { message: error_msg.DEFAULT, status: error_code._500 };

export class MyError extends Error {
  constructor(data = defaultError) {
    super(data.message);
    this.statusCode = data.status;
  }
}
