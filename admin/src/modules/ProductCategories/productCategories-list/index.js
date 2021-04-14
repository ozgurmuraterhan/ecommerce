import { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "@Redux/productCategories/productCategoriesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
// Components
import ProductCategoryItem from "@Modules/ProductCategories/productCategory-item";

const ProductCategoriesList = () => {
  // Getting current state of productCategories list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.productCategories }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // ProductCategories Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchProductCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const deleteProductCategory = (id) => {
    // server request for deleting productCategory by id
    dispatch(actions.deleteProductCategory(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchProductCategories());
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
              <div>ProductCategories ({totalCount})</div>
              <div>
                <Link to="/productCategory/add" className="btn btn-primary">
                  <i className="fa fa-plus"></i>
                  {` `}
                  Add ProductCategory
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
                  entities?.map((productCategory) => (
                    <ProductCategoryItem
                      key={productCategory._id}
                      id={productCategory._id}
                      name={productCategory.name}
                      description={productCategory.description}
                      pictureUrl={productCategory.pictureUrl}
                      deleteProductCategoryHandler={deleteProductCategory}
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

export default ProductCategoriesList;
