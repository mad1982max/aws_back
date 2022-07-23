import pg from "pg";
import { handleResponse } from "../helpers/handleResponse.js";
import { DB_Options } from "../helpers/db/db_options.js";
import { error } from "../helpers/constants.js";

export const createProduct = async (event) => {
  try {
    const client = new pg.Client(DB_Options);
    await client.connect();
    const { title, description, price } = event.body;
    const query_createProduct = /*sql*/ `
      insert into products (title, description, price) values
      (${title}, ${description}, ${price})
    `;
    const result = await client.query(query_createProduct);
    return handleResponse("product was created");
  } catch (e) {
    return handleResponse(e.message, error._500);
  } finally {
    client.end();
  }
};
