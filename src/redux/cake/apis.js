import restful from '../../utils/restful';

async function getAllCakes() {
  try {
    const res = await restful.GET('/product');
    return res;
  } catch (err) {
    return err;
  }
}

async function createCake(data) {
  try {
    const res = await restful.POST('/product', data);
    return res;
  } catch (err) {
    return err;
  }
}

async function updateCake(data) {
  try {
    const res = await restful.PUT(`/product/${data.id}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

async function deleteCake(data) {
  try {
    const res = await restful.DELETE(`/product/${data.id}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export default {
  getAllCakes,
  createCake,
  updateCake,
  deleteCake
};
