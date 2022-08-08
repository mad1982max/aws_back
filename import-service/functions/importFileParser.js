import AWS from "aws-sdk";
import csv from "csv-parser";
import { successResponse, errorResponse } from "../helpers/handleResponse.js";
import { statusCodes, folders, BUCKET as Bucket, REGION as region } from "../constants.js";

export const importFileParser = async (event) => {
  try {
    const s3 = new AWS.S3({ region });
    const { key: Key } = event.Records[0].s3.object;

    const fileName = Key.split("/")[1].split(".")[0];
    const parsedData = [];

    const streamParams = { Bucket, Key };
    const s3Stream = s3.getObject(streamParams).createReadStream();

    for await (const chunk of s3Stream.pipe(csv())) {
      console.log("--CHUNK: ", chunk);
      parsedData.push(chunk);
    }

    console.log("--PARSED DATA: ", parsedData);

    //write parsed file to new Folder
    await s3
      .putObject({
        Bucket,
        Key: `${folders.PARSED}/${fileName}.json`,
        Body: JSON.stringify(parsedData),
        ContentType: "application/json",
      })
      .promise();

    //delete old File
    await s3.deleteObject({ Bucket, Key }).promise();

    return successResponse(null, statusCodes.ACCEPTED);
  } catch (err) {
    console.log("--ERROR", err);
    return errorResponse(err, statusCodes.SERVER_ERROR);
  }
};
