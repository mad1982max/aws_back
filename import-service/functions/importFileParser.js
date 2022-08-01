import AWS from "aws-sdk";
import csv from "csv-parser";
import { BUCKET, UPLOADED_FOLDER, PARSED_FOLDER } from "../constants.js";
import { error_code, success_code } from "../constants";

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
    const fileName = file.Key.split("/")[1].split(".")[0];
    const parsedData = [];

    const params = {
      Bucket: BUCKET,
      Key: file.Key,
    };

    console.log("--file to parse--", file, params);
    const s3Stream = s3.getObject(params).createReadStream();

    for await (const chunk of s3Stream.pipe(csv())) {
      console.log("**chunk**", chunk);
      parsedData.push(chunk);
    }

    console.log("---parsedData---", parsedData);

    //write parsed file to new Folder
    await s3
      .putObject({
        Bucket: BUCKET,
        Key: `${PARSED_FOLDER}/${fileName}.json`,
        Body: JSON.stringify(parsedData),
        ContentType: "application/json",
      })
      .promise();

    //delete old File
    await s3
      .deleteObject({
        Bucket: BUCKET,
        Key: file.Key,
      })
      .promise();

    return {
      statusCode: success_code._202,
    };
  } catch (e) {
    console.log("**error**", e);
    return {
      statusCode: error_code._500,
    };
  }
};
