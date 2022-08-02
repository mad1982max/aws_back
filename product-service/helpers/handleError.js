import { DB_ErrorCode } from "../helpers/db/db_errorsCode.js";
import { error_msg } from "../constants.js";

export class MyError extends Error {
  constructor(e, handleCode, message) {
    super(e);
    this.message = message || DB_ErrorCode[e.code] || e.message || error_msg.DEFAULT;
    this.code = handleCode;
  }
}
