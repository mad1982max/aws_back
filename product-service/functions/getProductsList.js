import pg from "pg";
import { handleResponse } from "../helpers/handleResponse.js";
import { DB_Options } from "../helpers/db/db_options.js";
import { error_code } from "../constants.js";

export const getProductsList = async (event) => {
  const client = new pg.Client(DB_Options);
  await client.connect();
  try {
    const query_getProductsList = /*sql*/ `
      select * from products left join stocks on products.id=stocks.product_id
    `;
    const result = await client.query(query_getProductsList);
    return handleResponse({ data: result.rows });
  } catch (e) {
    return handleResponse({ message: e.message }, error_code._500);
  } finally {
    client.end();
  }
};
