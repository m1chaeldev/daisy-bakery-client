import restful from '../../utils/restful';

async function getAllCarts() {
  try {
    const res = await restful.GET('/cart');
    return res;
  } catch (err) {
    return err;
  }
}

export default { getAllCarts };
