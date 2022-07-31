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

    const params = {
      Bucket: BUCKET,
      Prefix: `${UPLOADED_FOLDER}/`,
    };

    const s3Response = await s3.listObjectsV2(params).promise();
    const files = s3Response.Contents;

    const file = files.find((file) => file.Key === `${UPLOADED_FOLDER}/${fileName}`);
    if (!file) {
      throw new MyError({ status: error_code._404, message: error_msg.NOT_FOUND });
    }
    const signed_url = `https://${BUCKET}.s3.amazonaws.com/${file.Key}`;
    return successResponse({ data: { signed_url } });
  } catch (error) {
    return errorResponse(error);
  }
};
