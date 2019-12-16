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

async function createCategory(data) {
  try {
    const res = await restful.POST('/category', data);
    return res;
  } catch (err) {
    return err;
  }
}

async function updateCategory(data) {
  try {
    const res = await restful.PUT(`/category/${data.id}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

async function deleteCategory(data) {
  try {
    const res = await restful.DELETE(`/category/${data.id}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

async function createCategoryChild(data) {
  try {
    const res = await restful.POST('/category/child', data);
    return res;
  } catch (err) {
    return err;
  }
}

async function updateCategoryChild(data) {
  try {
    const res = await restful.PUT(`/category/child/${data.id}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

async function deleteCategoryChild(data) {
  try {
    const res = await restful.DELETE(`/category/child/${data.id}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export default {
  getAllCategories,
  getAllChildCategories,
  createCategory,
  createCategoryChild,
  updateCategory,
  updateCategoryChild,
  deleteCategory,
  deleteCategoryChild
};
