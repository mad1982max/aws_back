import { statusCodes } from "../constants.js";

const CORSHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

const JSONHeader = { "Content-Type": "application/json" };

export const successResponse = (data, statusCode = statusCodes.OK, headers = {}) => ({
  headers: { ...CORSHeaders, ...JSONHeader, ...headers },
  statusCode,
  body: JSON.stringify(data),
});

export const errorResponse = (
  { message, statusCode },
  error_code = statusCodes.SERVER_ERROR,
  headers = {}
) => ({
  headers: { ...CORSHeaders, ...JSONHeader, ...headers },
  statusCode: statusCode || error_code,
  body: JSON.stringify({ message }),
});
