import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "@Redux/roles/rolesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { RoleEditForm } from "./RoleEditForm";

const initRole = {
  id: undefined,
  name: "",
  description: "",
};

export function RoleEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { actionsLoading, roleForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.roles.actionsLoading,
      roleForEdit: state.roles.roleForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchRole(id));
    } else {
      backToRolesList();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  const saveRole = (values) => {
    if (!id) {
      backToRolesList();
    } else {
      let newValues = { ...values };

      dispatch(actions.updateRole(newValues))
        .then(() => backToRolesList())
        .catch((error) => console.log(error));
    }
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
              <div>Edit Role</div>
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
                <RoleEditForm
                  role={roleForEdit || initRole}
                  btnRef={btnRef}
                  saveRole={saveRole}
                />
              )}
            </Card.Body>
            <Card.Footer>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={saveRoleClick}
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
