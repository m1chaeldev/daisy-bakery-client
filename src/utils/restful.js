const API_URL = 'http://192.168.1.16:55544/';

async function request(path, method, payload = {}) {
  try {
    const url = new URL(`${API_URL}${path}`);
    const options = {
      method,
      headers: {
        Authorization: localStorage.getItem('token') || '',
        'Content-Type': 'application/json'
      }
    };

    if (method === 'GET')
      Object.keys(payload).forEach(key =>
        url.searchParams.append(key, payload[key])
      );

    if (method === 'POST' || method === 'PUT')
      options.body = JSON.stringify(payload);
    const res = await fetch(url, options);
    if (!res.ok) throw Error(res.statusText);
    return await res.json();
  } catch (err) {
    if (err.toString().includes('Failed to fetch')) {
      const res = { error: 'Failed to fetch' };
      throw res;
    } else throw err;
  }
}

const restful = {
  GET: (path, params) => request(path, 'GET', params),
  POST: (path, body) => request(path, 'POST', body),
  PUT: (path, body) => request(path, 'PUT', body),
  DELETE: path => request(path, 'DELETE')
};

export default restful;
