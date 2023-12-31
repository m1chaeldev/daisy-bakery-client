const API_URL = 'https://banhdaisy.com:4000/api/v1'; // for product
// const API_URL = 'https://localhost:4000/api/v1'; // for dev

async function request(path, method, payload = {}) {
  try {
    const url = new URL(`${API_URL}${path}`);

    const options = {
      method,
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}` || '',
        'Content-Type': 'application/json'
      }
    };

    if (method === 'GET')
      Object.keys(payload).forEach(key =>
        url.searchParams.append(key, payload[key])
      );
    if (method === 'POST' || method === 'PUT' || method === 'DELETE')
      options.body = JSON.stringify(payload);

    const res = await fetch(url, options);
    const resJson = await res.json();

    if (resJson && resJson.message === 'Request unauthenticated') {
      localStorage.clear();
      // window.location.replace('/');
    }

    return resJson;
  } catch (err) {
    const res = {
      error: err.toString().includes('Failed to fetch')
        ? 'Failed to fetch'
        : err,
      message: 'Failed to fetch'
    };
    throw res;
  }
}

const restful = {
  GET: (path, params) => request(path, 'GET', params),
  POST: (path, body) => request(path, 'POST', body),
  PUT: (path, body) => request(path, 'PUT', body),
  DELETE: (path, body) => request(path, 'DELETE', body)
};

export default restful;
