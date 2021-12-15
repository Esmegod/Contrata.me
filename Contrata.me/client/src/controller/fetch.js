const baseUrl = process.env.REACT_APP_API_URL;
const getItem = require('../util/Storage').getItem
const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    })
      .then(async function (json) {
        return await json;
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  }
}

const fetchConToken = async (endpoint, data, method = 'GET') => {

  const url = `${baseUrl}/${endpoint}`;
  const token = getItem('token') || '';

  if (method === 'GET') {
    return await fetch(url, {
      method,
      headers: {
        'x-token': token
      }
    }).then(response => {
      return response.json();
    })
      .then(async function (json) {
        return await json;
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  } else {
    return await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    })
      .then(async function (json) {
        return await json;
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  }
}

export {
  fetchSinToken,
  fetchConToken
}