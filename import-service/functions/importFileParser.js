import AWS from "aws-sdk";
import csv from "csv-parser";
import { MyError } from "../helpers/handleError.js";
import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import {
  statusCodes,
  folders,
  BUCKET as Bucket,
  REGION as region,
  error_msg,
} from "../constants.js";

export const importFileParser = async (event) => {
  try {
    const parsedData = [];
    const s3 = new AWS.S3({ region });
    const { key: Key } = event.Records[0].s3.object;

    const [fileName] = Key.split("/")[1].split(".");

    const streamParams = { Bucket, Key };
    const s3Stream = s3.getObject(streamParams).createReadStream();

    for await (const chunk of s3Stream.pipe(csv())) {
      parsedData.push(chunk);
    }
    console.log("--PARSED DATA: ", parsedData);

    //SQS
    const sqs = new AWS.SQS();
    for (const item of parsedData) {
      sqs.sendMessage(
        {
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(item, null, " "),
        },
        (err, data) => {
          if (err) {
            console.log("-- SQS ERROR", err);
            throw new MyError({
              status: statusCodes.SERVER_ERROR,
              message: error_msg.SERVER_ERROR,
            });
          }
          console.log("--MESSAGE WAS SENT:", data);
        }
      );
    }

    //write parsed file to new Folder
    await s3
      .putObject({
        Bucket,
        Key: `${folders.PARSED}/${fileName}.json`,
        Body: JSON.stringify(parsedData, null, " "),
        ContentType: "application/json",
      })
      .promise();

    //delete old File
    await s3.deleteObject({ Bucket, Key }).promise();
    console.log("--FILE WAS DELETED", Key);

    return successResponse(null, statusCodes.ACCEPTED);
  } catch (err) {
    console.log("--ERROR", err);
    return errorResponse(err, statusCodes.SERVER_ERROR);
  }
};
