import pg from "pg";
import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import { logger } from "../helpers/logger.js";
import { DB_Options } from "../helpers/db/db_options.js";
import { MyError } from "../helpers/handleError.js";
import { error_code } from "../constants.js";

export const getProductsList = async (event) => {
  logger(event);
  const client = new pg.Client(DB_Options);
  try {
    await client.connect();
    const query_getProductsList = /*sql*/ `
      select * from products left join stocks on products.id=stocks.product_id
    `;
    const result = await client.query(query_getProductsList);
    return successResponse({ data: result.rows });
  } catch (e) {
    const customError = new MyError(e, error_code._500);
    return errorResponse(customError);
  } finally {
    client.end();
  }
};
