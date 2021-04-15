import { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "@Redux/roles/rolesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
// Components
import RoleItem from "@Modules/Roles/role-item";

const RolesList = () => {
  // Getting current state of roles list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.roles }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Roles Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchRoles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const deleteRole = (id) => {
    // server request for deleting role by id
    dispatch(actions.deleteRole(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchRoles());
    });
  };

  return (
    <Container fluid>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Header
              as="h5"
              className="bg-white d-flex justify-content-between align-items-center"
            >
              <div>Roles ({totalCount})</div>
              <div>
                <Link to="/role/add" className="btn btn-primary">
                  <i className="fa fa-plus"></i>
                  {` `}
                  Add Role
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                {listLoading ? (
                  <Col className="text-center">
                    <h6>Please wait...</h6>
                  </Col>
                ) : (
                  entities?.map((role) => (
                    <RoleItem
                      key={role._id}
                      id={role._id}
                      category={role.category}
                      name={role.name}
                      description={role.description}
                      price={role.price}
                      countInStock={role.countInStock}
                      pictureUrl={role.pictureUrl}
                      deleteRoleHandler={deleteRole}
                    />
                  ))
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RolesList;
