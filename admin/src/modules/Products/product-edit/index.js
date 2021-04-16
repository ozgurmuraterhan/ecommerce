import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "@Redux/products/productsActions";
import * as productCategoriesActions from "@Redux/productCategories/productCategoriesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ProductEditForm } from "./ProductEditForm";

const initProduct = {
  id: undefined,
  name: "",
  description: "",
  price: 0,
  countInStock: 0,
  isPublished: false,
  pictureUrl: null,
  productCategoryId: "",
};

export function ProductEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { actionsLoading, productForEdit, productCategories } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productForEdit: state.products.productForEdit,
      productCategories: state.productCategories.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchProduct(id));
    } else {
      backToProductsList();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(productCategoriesActions.fetchAllProductCategories());
  }, [dispatch]);

  const saveProduct = (values) => {
    if (!id) {
      backToProductsList();
    } else {
      let formData = new FormData();
      formData.append("id", values.id);
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

      dispatch(actions.updateProduct(formData))
        .then(() => backToProductsList())
        .catch((error) => console.log(error));
    }
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
              <div>Edit Product</div>
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
                <ProductEditForm
                  product={productForEdit || initProduct}
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
