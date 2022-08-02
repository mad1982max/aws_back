const CORSHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};
const JSONHeader = { "Content-Type": "application/json" };

export const successResponse = (data, statusCode = 200, headers = {}) => ({
  headers: { ...headers, ...CORSHeaders, ...JSONHeader },
  statusCode,
  body: JSON.stringify(data),
});

export const errorResponse = ({ message, code }, headers = {}) => ({
  headers: { ...headers, ...CORSHeaders, ...JSONHeader },
  statusCode: code,
  body: JSON.stringify({ message }),
});
