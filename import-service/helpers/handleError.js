import { error_msg, statusCodes } from "../constants.js";

const defaultError = { message: error_msg.DEFAULT, status: statusCodes.SERVER_ERROR };

export class MyError extends Error {
  constructor(data = defaultError) {
    super(data.message);
    this.statusCode = data.status;
  }
}
