import restful from '../../utils/restful';

async function getAllCakes() {
  try {
    const res = await restful.GET('/product');
    return res;
  } catch (err) {
    return err;
  }
}

export default { getAllCakes };
