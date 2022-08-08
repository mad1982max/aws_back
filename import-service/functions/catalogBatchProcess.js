import pg from "pg";
import AWS from "aws-sdk";
import { MyError } from "../helpers/handleError.js";
import { DB_Options } from "../helpers/db/db_options.js";
import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import { statusCodes, REGION as region, error_msg, emailSubject } from "../constants.js";

export const catalogBatchProcess = async (event) => {
  try {
    const products = event.Records.map(({ body }) => JSON.parse(body));
    console.log("--PRODUCTS IN A QUEUE:", products);

    //DB
    const client = new pg.Client(DB_Options);
    await client.connect();

    const productsString = products
      .map(({ title, description, price }) => `('${title}','${description}','${price}')`)
      .join(",");

    const query_createProducts = /*sql*/ `
        insert into products (title, description, price) values
        ${productsString}
      `;
    await client.query(query_createProducts);
    client.end();

    //SNS
    const sns = new AWS.SNS({ region });
    sns.publish(
      {
        Subject: emailSubject,
        Message: JSON.stringify(products, null, " "),
        TopicArn: process.env.SNS_ARN,
      },
      (err, data) => {
        if (err) {
          console.log("--SNS ERROR", err);
          throw new MyError({
            status: statusCodes.SERVER_ERROR,
            message: error_msg.SERVER_ERROR,
          });
        }
        console.log("--EMAIL WAS SENT", data);
      }
    );

    return successResponse(null, statusCodes.OK);
  } catch (err) {
    console.log("--ERROR", err);
    return errorResponse(err, statusCodes.SERVER_ERROR);
  }
};
