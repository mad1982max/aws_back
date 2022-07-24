import pg from "pg";
import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import { logger } from "../helpers/logger.js";
import { DB_Options } from "../helpers/db/db_options.js";
import { success_msg, error_code } from "../constants.js";

export const createProduct = async (event) => {
  try {
    const client = new pg.Client(DB_Options);
    logger(event);
    await client.connect();
    const { title, description, price } = event.body;

    const query_createProduct = /*sql*/ `
      insert into products (title, description, price) values
      (${title}, ${description}, ${price})
    `;
    await client.query(query_createProduct);
    return successResponse({ message: success_msg.CREATED });
  } catch (e) {
    const customError = new MyError(e, error_code._500);
    return errorResponse(customError);
  } finally {
    client.end();
  }
};
