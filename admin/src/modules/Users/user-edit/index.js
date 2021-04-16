import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "@Redux/users/usersActions";
import * as rolesActions from "@Redux/roles/rolesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserEditForm } from "./UserEditForm";

const initUser = {
  id: undefined,
  username: "",
  isActive: false,
  avatar: null,
  roleId: {
    label: "",
    value: "",
  },
};

export function UserEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { actionsLoading, userForEdit, roles } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,
      roles: state.roles.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(rolesActions.fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchUser(id));
    } else {
      backToUsersList();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  const saveUser = (values) => {
    if (!id) {
      backToUsersList();
    } else {
      let formData = new FormData();
      formData.append("id", values.id);
      formData.append("username", values.username);
      formData.append("isActive", values.isActive);
      formData.append("roleId", values.roleId.value);

      if (
        values.avatar &&
        values.avatar !== null &&
        values.avatar !== undefined
      ) {
        formData.append(`avatar`, values.avatar);
      }

      dispatch(actions.updateUser(formData))
        .then(() => backToUsersList())
        .catch((error) => console.log(error));
    }
  };

  const btnRef = useRef();
  const saveUserClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToUsersList = () => {
    history.push(`/user`);
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header
              as="h5"
              className="bg-white d-flex justify-content-between align-items-center"
            >
              <div>Edit User</div>
              <div>
                <button
                  type="button"
                  onClick={backToUsersList}
                  className="btn btn-light"
                >
                  <i className="fa fa-arrow-left"></i>
                  {` `}
                  Back
                </button>
              </div>
            </Card.Header>
            <Card.Body>
              {actionsLoading ? (
                <Row>
                  <Col className="text-center">
                    <h6>Please wait...</h6>
                  </Col>
                </Row>
              ) : (
                <UserEditForm
                  roles={roles}
                  user={userForEdit || initUser}
                  btnRef={btnRef}
                  saveUser={saveUser}
                />
              )}
            </Card.Body>
            <Card.Footer>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={saveUserClick}
                disabled={actionsLoading}
              >
                {actionsLoading ? "Please wait..." : "Save Changes"}
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
