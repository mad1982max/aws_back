const CORSHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

const JSONHeader = { "Content-Type": "application/json" };

export const handleResponse = (data, statusCode = 200, headers) => ({
  statusCode,
  headers: { ...headers, ...CORSHeaders, ...JSONHeader },
  body: JSON.stringify(data),
});
