import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import { statusCodes, REGION as region } from "../constants.js";

export const catalogBatchProcess = async (event) => {
  try {
    const items = event.Records.map(({ body }) => body);

    console.log("---items in queue:", items);

    const sns = new AWS.SNS({ region });
    sns.publish(
      {
        Subject: "Products are created",
        Message: JSON.stringify(items),
        TopicArn: process.env.SNS_ARN,
      },
      (err, data) => {
        if (err) {
          console.log("**err", err);
          throw Error(err.message);
        }
        console.log("--send email", data);
      }
    );

    return successResponse(null, statusCodes.OK);
  } catch (err) {
    return errorResponse(err, statusCodes.SERVER_ERROR);
  }
};
