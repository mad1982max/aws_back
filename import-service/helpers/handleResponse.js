const CORSHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};
const JSONHeader = { "Content-Type": "application/json" };

export const successResponse = (data, statusCode = 200, headers = {}) => ({
  headers: { ...CORSHeaders, ...JSONHeader, ...headers },
  statusCode,
  body: JSON.stringify(data),
});

export const errorResponse = ({ message, statusCode }, headers = {}) => ({
  headers: { ...CORSHeaders, ...JSONHeader, ...headers },
  statusCode,
  body: JSON.stringify({ message }),
});
