import axios from "axios";
import url from "@Helpers/api/url.json";

// export const USERS_URL = "api/users";
export const USERS_URL = `${url.USERS_URL}`;

// CREATE =>  POST: add a new user to the server
export function createUser(user) {
  const configuration = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(`${USERS_URL}`, user, configuration);
}

// READ
export function getAllUsers() {
  return axios.get(USERS_URL);
}

export function getUserById(userId) {
  return axios.get(`${USERS_URL}/${userId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUsers() {
  return axios.get(`${USERS_URL}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
// export function findUsers(queryParams) {
// return axios.post(`${USERS_URL}/find`, { queryParams });
// return axios.get(
// `${USERS_URL}?UserCategoryId=${queryParams.filter.userCategoryId}&PageNumber=${queryParams.pageNumber}&PageSize=${queryParams.pageSize}`
// );
// }

// UPDATE => PUT: update the procuct on the server
export function updateUser(user) {
  const configuration = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.put(`${USERS_URL}`, user, configuration);
  // return axios.put(`${USERS_URL}/${user.id}`, { user });
}

// UPDATE Status
// export function updateStatusForUsers(ids, status) {
//   return axios.post(`${USERS_URL}/updateStatusForUsers`, {
//     ids,
//     status
//   });
// }

// DELETE => delete the user from the server
export function deleteUser(id) {
  return axios.delete(`${USERS_URL}/${id}`);
}

// DELETE Users by ids
export function deleteUsers(ids) {
  const idsForDelete = [];
  ids.map((id) => idsForDelete.push(id));

  return axios.delete(`${USERS_URL}`, { data: { Id: idsForDelete } });
}
