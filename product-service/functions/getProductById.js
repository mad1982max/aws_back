import pg from "pg";
import { handleResponse } from "../helpers/handleResponse.js";
import { DB_Options } from "../helpers/db/db_options.js";
import { error } from "../helpers/constants.js";

export const getProductById = async (event) => {
  const client = new pg.Client(DB_Options);
  await client.connect();
  try {
    const { productId } = event.pathParameters;

    const query_getProductById = /*sql*/ `
      select * from products left join stocks on products.id=stocks.product_id where id='${productId}'
    `;
    const result = await client.query(query_getProductById);
    return handleResponse(result.rows);
  } catch (e) {
    return handleResponse(e.message, error._404);
  } finally {
    client.end();
  }
};
