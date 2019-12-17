import restful from '../../utils/restful';

async function getUser(data) {
  try {
    const res = await restful.GET(`/user/${data.id}`);
    return res;
  } catch (err) {
    return err;
  }
}

async function createUser(data) {
  try {
    const res = await restful.POST('/user', data);
    return res;
  } catch (err) {
    return err;
  }
}

async function updateUser(data) {
  try {
    const res = await restful.PUT(`/user/${data._id}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

async function blockUser(data) {
  try {
    const res = await restful.PUT(`/user/${data._id}/block`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export default { getUser, createUser, updateUser, blockUser };
