import { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "@Redux/products/productsActions";
import { Container, Row, Col, Card } from "react-bootstrap";

const HomePage = () => {
  // Getting curret state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  // const { totalCount, entities, listLoading } = currentState;
  const { totalCount, listLoading } = currentState;
  // Products Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Container fluid>
      <Row className="my-3">
        {listLoading ? (
          <Col className="text-center">
            <Card>
              <Card.Body>
                <h6>Please wait...</h6>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <Col>
            <Card>
              <Card.Header as="h5" className="bg-white">
                Links
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} sm={6} md={4} lg={4} xl={3}>
                    <Card>
                      <Card.Header>
                        <Link to="/product">
                          <h4>Products ({totalCount})</h4>
                        </Link>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={4} xl={3}>
                    <Card>
                      <Card.Header>
                        <Link to="/productCategory">
                          <h4>Product Categories</h4>
                        </Link>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={4} xl={3}>
                    <Card>
                      <Card.Header>
                        <Link to="/user">
                          <h4>Users</h4>
                        </Link>
                      </Card.Header>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={4} xl={3}>
                    <Card>
                      <Card.Header>
                        <Link to="/role">
                          <h4>Roles</h4>
                        </Link>
                      </Card.Header>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
