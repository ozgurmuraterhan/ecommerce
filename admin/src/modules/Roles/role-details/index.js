import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "@Redux/roles/rolesActions";
import { Container } from "react-bootstrap";
import { RoleDetailsItem } from "./RoleDetailsItem";

const RoleDetails = ({
  history,
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const { actionsLoading, roleForDetails } = useSelector(
    (state) => ({
      actionsLoading: state.roles.actionsLoading,
      roleForDetails: state.roles.roleForDetails,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchRoleForRoleDetails(id));
    } else {
      backToRolesList();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  const backToRolesList = () => {
    history.push(`/role`);
  };

  const editRoleHandler = (id) => {
    history.push(`/role/edit/${id}`);
  };

  const deleteRole = (id) => {
    // server request for deleting role by id
    dispatch(actions.deleteRole(id))
      .then(() => backToRolesList())
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <RoleDetailsItem
        actionsLoading={actionsLoading}
        roleForDetails={roleForDetails}
        editRoleHandler={editRoleHandler}
        deleteRoleHandler={deleteRole}
      />
    </Container>
  );
};

export default RoleDetails;
