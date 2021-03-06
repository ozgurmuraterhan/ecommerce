import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "@Redux/users/usersActions";
import * as rolesActions from "@Redux/roles/rolesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserAddForm } from "./UserAddForm";

export function UserAdd({ history }) {
  const dispatch = useDispatch();
  const { actionsLoading, roles } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      roles: state.roles.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(rolesActions.fetchRoles());
  }, [dispatch]);

  const saveUser = (values) => {
    let formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("isActive", values.isActive);
    formData.append("roleId", values.roleId.value);

    if (
      values.avatar &&
      values.avatar !== null &&
      values.avatar !== undefined
    ) {
      formData.append(`avatar`, values.avatar);
    }

    dispatch(actions.createUser(formData))
      .then(() => backToUsersList())
      .catch((error) => console.error(error));
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
              <div>Add User</div>
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
                <UserAddForm
                  roles={roles}
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
                {actionsLoading ? "Please wait..." : "Add User"}
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
