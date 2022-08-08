export const logger = (e) => {
  const logData = {
    pathParameters: e?.pathParameters,
    rawQueryString: e?.rawQueryString,
    body: e?.body,
    path: e?.requestContext.http.path,
    method: e?.requestContext.http.method,
    date: new Date().toLocaleString(),
  };
  console.log("--LOGGER--", logData);
};
