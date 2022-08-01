import AWS from "aws-sdk";
import csv from "csv-parser";
import { BUCKET, UPLOADED_FOLDER } from "../constants.js";

export const importFileParser = async (event) => {
  try {
    const s3 = new AWS.S3({
      region: "us-east-1",
    });

    const objParams = {
      Bucket: BUCKET,
      Prefix: `${UPLOADED_FOLDER}/`,
    };

    const s3Response = await s3.listObjectsV2(objParams).promise();
    const files = s3Response.Contents.filter((file) => file.Size);
    const file = files[0];
    const parsedData = [];

    const params = {
      Bucket: BUCKET,
      Key: file.Key,
    };

    console.log("--file--", file, params);
    const s3Stream = s3.getObject(params).createReadStream();

    for await (const chunk of s3Stream.pipe(csv())) {
      console.log("**chunk**", chunk);
      parsedData.push(chunk);
    }

    console.log("---parsedData---", parsedData);
  } catch (e) {
    console.log("**error**", e);
  }
};
