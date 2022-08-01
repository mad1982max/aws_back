// import { AWS } from "aws-sdk";
import AWS from "aws-sdk";
import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import { logger } from "../helpers/logger.js";
import { MyError } from "../helpers/handleError.js";
import { error_code, error_msg, BUCKET, UPLOADED_FOLDER } from "../constants.js";

export const importProductFile = async (event) => {
  try {
    logger(event);
    const fileName = event?.queryStringParameters?.name;

    if (!fileName) {
      throw new MyError({ status: error_code._400, message: error_msg.BAD_REQUEST });
    }

    const s3 = new AWS.S3({
      region: "us-east-1",
    });

    const Key = `${UPLOADED_FOLDER}/${fileName}`;

    const s3Params = {
      Bucket: BUCKET,
      Key,
    };
    const signed_url = await s3.getSignedUrlPromise("putObject", s3Params);

    return successResponse({ signed_url });
  } catch (error) {
    console.log("***err***", error);
    return errorResponse(error);
  }
};
