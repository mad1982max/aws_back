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

    for (let file of files) {
      const parsedData = [];

      const params = {
        Bucket: BUCKET,
        Key: file.Key,
      };

      console.log("--file--", file, params);

      const s3Stream = s3.getObject(params).createReadStream();

      s3Stream
        .pipe(csv())
        .on("data", (dataChunk) => {
          console.log("**data-chunk**", dataChunk);
          parsedData.push(dataChunk);
        })
        .on("error", (e) => console.log("**error**", e))
        .on("end", () => console.log("**end**", parsedData));
    }

    return {
      statusCode: 202,
    };
  } catch (e) {
    console.log("**error**", e);
    return {
      statusCode: 500,
    };
  }
};
