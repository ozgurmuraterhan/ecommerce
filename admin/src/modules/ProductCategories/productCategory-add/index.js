import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "@Redux/productCategories/productCategoriesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ProductCategoryAddForm } from "./ProductCategoryAddForm";

const initProductCategory = {
  name: "",
  description: "",
  pictureUrl: null,
};

export function ProductCategoryAdd({ history }) {
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.productCategories.actionsLoading,
    }),
    shallowEqual
  );

  const saveProductCategory = (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("isPublished", true);

    if (
      values.pictureUrl &&
      values.pictureUrl !== null &&
      values.pictureUrl !== undefined
    ) {
      formData.append(`pictureUrl`, values.pictureUrl);
    }

    dispatch(actions.createProductCategory(formData))
      .then(() => backToProductCategoriesList())
      .catch((error) => console.log(error));
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
              <div>Add ProductCategory</div>
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
                <ProductCategoryAddForm
                  actionsLoading={actionsLoading}
                  productCategory={initProductCategory}
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
                Add ProductCategory
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
