export function getRates() {
  const url = 'https://api.freecurrencyapi.com/v1/latest?base_currency=USD';
  let myHeaders: any = new Headers();
  myHeaders.append('apikey', 'dY2f5k7JeID0ntVfGTSUNo2m5HhAWJftwCHIBwzC');
  let requestOptions: any = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };
  return fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((e) => {
      console.log(e);
    });
}
