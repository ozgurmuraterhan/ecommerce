import axios from "axios";
import url from "@Helpers/api/url.json";

// export const ROLES_URL = "api/roles";
export const ROLES_URL = `${url.ROLES_URL}`;

// CREATE =>  POST: add a new role to the server
export function createRole(role) {
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(`${ROLES_URL}`, role, configuration);
}

// READ
export function getAllRoles() {
  return axios.get(ROLES_URL);
}

export function getRoleById(roleId) {
  return axios.get(`${ROLES_URL}/${roleId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findRoles() {
  return axios.get(`${ROLES_URL}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
// export function findRoles(queryParams) {
// return axios.post(`${ROLES_URL}/find`, { queryParams });
// return axios.get(
// `${ROLES_URL}?RoleCategoryId=${queryParams.filter.roleCategoryId}&PageNumber=${queryParams.pageNumber}&PageSize=${queryParams.pageSize}`
// );
// }

// UPDATE => PUT: update the procuct on the server
export function updateRole(role) {
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.put(`${ROLES_URL}`, role, configuration);
  // return axios.put(`${ROLES_URL}/${role.id}`, { role });
}

// UPDATE Status
// export function updateStatusForRoles(ids, status) {
//   return axios.post(`${ROLES_URL}/updateStatusForRoles`, {
//     ids,
//     status
//   });
// }

// DELETE => delete the role from the server
export function deleteRole(id) {
  return axios.delete(`${ROLES_URL}/${id}`);
}

// DELETE Roles by ids
export function deleteRoles(ids) {
  const idsForDelete = [];
  ids.map((id) => idsForDelete.push(id));

  return axios.delete(`${ROLES_URL}`, { data: { Id: idsForDelete } });
}
