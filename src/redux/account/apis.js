import restful from '../../utils/restful';

async function login(req) {
  try {
    const res = await restful.POST('api/v1/login', req);
    return res;
  } catch (err) {
    return err;
  }
}

export default { login };
