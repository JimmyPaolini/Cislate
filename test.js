const request = require("request-promise-native");

(async () => {
  const url = 'https://nqhfwgv4ib.execute-api.us-east-2.amazonaws.com/default/cislate?latin=' + 'luna';
  const response = await request.get(url, {headers: {'x-api-key': 'zDy6OMHcqi89AYF4J0kXO8bbxOzCUXb5afeHAkNs'}});
  console.log(response);
})()
