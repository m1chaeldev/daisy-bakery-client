import restful from '../../utils/restful';

async function getAllCategories() {
  try {
    const res = await restful.GET('/category');
    return res;
  } catch (err) {
    return err;
  }
}

async function getAllChildCategories() {
  try {
    const res = await restful.GET('/category/child');
    return res;
  } catch (err) {
    return err;
  }
}

export default { getAllCategories, getAllChildCategories };
