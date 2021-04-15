import { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "@Redux/users/usersActions";
import { Container, Row, Col, Card } from "react-bootstrap";
// Components
import UserItem from "@Modules/Users/user-item";

const UsersList = () => {
  // Getting current state of users list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Users Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const deleteUser = (id) => {
    // server request for deleting user by id
    dispatch(actions.deleteUser(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchUsers());
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
              <div>Users ({totalCount})</div>
              <div>
                <Link to="/user/add" className="btn btn-primary">
                  <i className="fa fa-plus"></i>
                  {` `}
                  Add User
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
                  entities?.map((user) => (
                    <UserItem
                      key={user._id}
                      id={user._id}
                      username={user.username}
                      role={user.role}
                      isActive={user.isActive}
                      avatar={user.avatar}
                      deleteUserHandler={deleteUser}
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

export default UsersList;
