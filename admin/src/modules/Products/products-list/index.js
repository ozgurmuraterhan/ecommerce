import { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "@Redux/products/productsActions";
import { Container, Row, Col, Card } from "react-bootstrap";
// Components
import ProductItem from "@Modules/Products/product-item";

const ProductsList = () => {
  // Getting current state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Products Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const deleteProduct = (id) => {
    // server request for deleting product by id
    dispatch(actions.deleteProduct(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchProducts());
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
              <div>Products ({totalCount})</div>
              <div>
                <Link to="/product/add" className="btn btn-primary">
                  <i className="fa fa-plus"></i>
                  {` `}
                  Add Product
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
                  entities?.map((product) => (
                    <ProductItem
                      key={product._id}
                      id={product._id}
                      category={product.category}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      countInStock={product.countInStock}
                      pictureUrl={product.pictureUrl}
                      deleteProductHandler={deleteProduct}
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

export default ProductsList;
