import * as requestFromServer from "./rolesCrud";
import { rolesSlice, callTypes } from "./rolesSlice";

const { actions } = rolesSlice;

export const fetchRoles = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRoles()
    .then((response) => {
      // const { totalCount, entities } = response.data;
      const { totalCount } = response.data.meta;
      const { data: entities } = response.data;
      dispatch(actions.rolesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find roles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchRoleForRoleDetails = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.roleFetchedForRoleDetails({ roleForDetails: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRoleById(id)
    .then((response) => {
      const role = response.data.data;
      dispatch(actions.roleFetchedForRoleDetails({ roleForDetails: role }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchRole = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.roleFetched({ roleForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRoleById(id)
    .then((response) => {
      const role = response.data.data;
      dispatch(actions.roleFetched({ roleForEdit: role }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createRole = (roleForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRole(roleForCreation)
    .then((response) => {
      roleForCreation = JSON.stringify(roleForCreation.serializeObject());
      const { roleId } = response.data.roleId;
      roleForCreation._id = roleId;
      dispatch(actions.roleCreated({ roleForCreation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRole = (role) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRole(role)
    .then((response) => {
      // fetchRoles();
      role = JSON.stringify(role.serializeObject());
      dispatch(actions.roleUpdated({ role }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRole = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRole(id)
    .then((response) => {
      dispatch(actions.roleDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

////////// *** --- *** End Useful Functions *** --- *** //////////

// export const fetchRoles = (queryParams) => (dispatch) => {
//   // console.log("debug :: actions :: fetchRoles :: isDone :D", queryParams);
//   dispatch(actions.startCall({ callType: callTypes.list }));
//   return requestFromServer
//     .findRoles(queryParams)
//     .then((response) => {
//       // const { totalCount, entities } = response.data;
//       const { totalCount } = response.data.meta;
//       const { data: entities } = response.data;
//       dispatch(actions.rolesFetched({ totalCount, entities }));
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find roles";
//       dispatch(actions.catchError({ error, callType: callTypes.list }));
//     });
// };

// export const updateRolesStatus = (ids, status) => dispatch => {
//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .updateStatusForRoles(ids, status)
//     .then(() => {
//       dispatch(actions.rolesStatusUpdated({ ids, status }));
//     })
//     .catch(error => {
//       error.clientMessage = "Can't update roles status";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };

export const deleteRoles = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRoles(ids)
    .then(() => {
      dispatch(actions.rolesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete roles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
