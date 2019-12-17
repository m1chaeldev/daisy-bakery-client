import restful from '../../utils/restful';

async function getAllCarts() {
  try {
    const res = await restful.GET('/cart');
    return res;
  } catch (err) {
    return err;
  }
}

async function createOrder(data) {
  try {
    const res = await restful.POST('/cart', data);
    return res;
  } catch (err) {
    return err;
  }
}

async function updateOrderStatus(data) {
  try {
    const res = await restful.PUT(`/cart/${data.id}/status`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export default { getAllCarts, createOrder, updateOrderStatus };
