import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "@Redux/productCategories/productCategoriesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ProductCategoryEditForm } from "./ProductCategoryEditForm";

const initProductCategory = {
  id: undefined,
  name: "",
  description: "",
  isPublished: false,
  pictureUrl: null,
};

export function ProductCategoryEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { actionsLoading, productCategoryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.productCategories.actionsLoading,
      productCategoryForEdit: state.productCategories.productCategoryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchProductCategory(id));
    } else {
      backToProductCategoriesList();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  const saveProductCategory = (values) => {
    if (!id) {
      backToProductCategoriesList();
    } else {
      let formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("isPublished", values.isPublished);

      if (
        values.pictureUrl &&
        values.pictureUrl !== null &&
        values.pictureUrl !== undefined
      ) {
        formData.append(`pictureUrl`, values.pictureUrl);
      }

      dispatch(actions.updateProductCategory(formData))
        .then(() => backToProductCategoriesList())
        .catch((error) => console.log(error));
    }
  };

  const btnRef = useRef();
  const saveProductCategoryClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToProductCategoriesList = () => {
    history.push(`/productCategory`);
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
              <div>Edit ProductCategory</div>
              <div>
                <button
                  type="button"
                  onClick={backToProductCategoriesList}
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
                <ProductCategoryEditForm
                  productCategory={
                    productCategoryForEdit || initProductCategory
                  }
                  btnRef={btnRef}
                  saveProductCategory={saveProductCategory}
                />
              )}
            </Card.Body>
            <Card.Footer>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={saveProductCategoryClick}
              >
                Save Changes
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
