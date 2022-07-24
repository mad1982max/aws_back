import pg from "pg";
import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import { logger } from "../helpers/logger.js";
import { DB_Options } from "../helpers/db/db_options.js";
import { error_code } from "../constants.js";

export const getProductById = async (event) => {
  const client = new pg.Client(DB_Options);
  try {
    logger(event);
    await client.connect();

    const { productId } = event.pathParameters;
    const query_getProductById = /*sql*/ `
      select * from products left join stocks on products.id=stocks.product_id where id='${productId}'
    `;
    const result = await client.query(query_getProductById);
    return successResponse({ data: result.rows });
  } catch (e) {
    const customError = new MyError(e, error_code._500);
    return errorResponse(customError);
  } finally {
    client.end();
  }
};
