import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "@Redux/roles/rolesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { RoleAddForm } from "./RoleAddForm";

export function RoleAdd({ history }) {
  const dispatch = useDispatch();
  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.roles.actionsLoading,
    }),
    shallowEqual
  );

  const saveRole = (values) => {
    let newValues = { ...values };

    dispatch(actions.createRole(newValues))
      .then(() => backToRolesList())
      .catch((error) => console.error(error));
  };

  const btnRef = useRef();
  const saveRoleClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToRolesList = () => {
    history.push(`/role`);
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
              <div>Add Role</div>
              <div>
                <button
                  type="button"
                  onClick={backToRolesList}
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
                <RoleAddForm btnRef={btnRef} saveRole={saveRole} />
              )}
            </Card.Body>
            <Card.Footer>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={saveRoleClick}
              >
                Add Role
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
