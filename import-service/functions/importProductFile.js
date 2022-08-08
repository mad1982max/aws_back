import AWS from "aws-sdk";
import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import { logger } from "../helpers/logger.js";
import { MyError } from "../helpers/handleError.js";
import {
  error_msg,
  statusCodes,
  folders,
  BUCKET as Bucket,
  REGION as region,
} from "../constants.js";

export const importProductFile = async (event) => {
  try {
    logger(event);
    const fileName = event?.queryStringParameters?.name;

    if (!fileName) {
      throw new MyError({ status: statusCodes.BAD_REQUEST, message: error_msg.BAD_REQUEST });
    }

    const s3 = new AWS.S3({ region });

    const s3Params = {
      Bucket,
      Key: `${folders.UPLOADED}/${fileName}`,
    };
    const signed_url = await s3.getSignedUrlPromise("putObject", s3Params);

    return successResponse({ signed_url });
  } catch (error) {
    console.log("--ERR:", error);
    return errorResponse(error);
  }
};
