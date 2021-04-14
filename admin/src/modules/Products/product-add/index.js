import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "@Redux/products/productsActions";
import * as productCategoriesActions from "@Redux/productCategories/productCategoriesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ProductAddForm } from "./ProductAddForm";

export function ProductAdd({ history }) {
  const dispatch = useDispatch();
  const { actionsLoading, productCategories } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productCategories: state.productCategories.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(productCategoriesActions.fetchAllProductCategories());
  }, [dispatch]);

  const saveProduct = (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("countInStock", values.countInStock);
    formData.append("isPublished", values.isPublished);
    formData.append("productCategoryId", values.productCategoryId.value);

    if (
      values.pictureUrl &&
      values.pictureUrl !== null &&
      values.pictureUrl !== undefined
    ) {
      formData.append(`pictureUrl`, values.pictureUrl);
    }

    dispatch(actions.createProduct(formData))
      .then(() => backToProductsList())
      .catch((error) => console.error(error));
  };

  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToProductsList = () => {
    history.push(`/product`);
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
              <div>Add Product</div>
              <div>
                <button
                  type="button"
                  onClick={backToProductsList}
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
                <ProductAddForm
                  productCategories={productCategories}
                  btnRef={btnRef}
                  saveProduct={saveProduct}
                />
              )}
            </Card.Body>
            <Card.Footer>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={saveProductClick}
              >
                Add Product
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
