import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import url from "@Helpers/api/url.json";

export const ProductCategoryDetailsItem = ({
  actionsLoading,
  productCategoryForDetails,
  editProductCategoryHandler,
  deleteProductCategoryHandler,
}) => {
  return (
    <Row className="my-3">
      {actionsLoading ? (
        <Col className="text-center">
          <h6>Please wait...</h6>
        </Col>
      ) : (
        <React.Fragment>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-3 px-2">
            <Card>
              <Link to={`/productCategory/${productCategoryForDetails?.id}`}>
                <Card.Img
                  variant="top"
                  src={`${url.myBaseUrl}/productCategories/${productCategoryForDetails?.pictureUrl}`}
                  alt={productCategoryForDetails?.name}
                  title={productCategoryForDetails?.name}
                />
              </Link>
              <Card.Body>
                <Link to={`/productCategory/${productCategoryForDetails?.id}`}>
                  <Card.Title>{productCategoryForDetails?.name}</Card.Title>
                </Link>
                <Link
                  to={`/productCategoryCategory/${productCategoryForDetails?.id}`}
                >
                  <Card.Text className="text-muted">{`${productCategoryForDetails?.category?.name}`}</Card.Text>
                </Link>
                <Card.Text>{productCategoryForDetails?.description}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link
                  href={`/productCategory/edit/${productCategoryForDetails?.id}`}
                >
                  Edit
                </Card.Link>
                <Card.Link
                  onClick={() =>
                    deleteProductCategoryHandler(productCategoryForDetails?.id)
                  }
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-3">
            <ListGroup>
              <ListGroupItem>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    editProductCategoryHandler(productCategoryForDetails._id)
                  }
                >
                  Edit ProductCategory
                </button>
              </ListGroupItem>
              <ListGroupItem>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() =>
                    deleteProductCategoryHandler(productCategoryForDetails._id)
                  }
                >
                  Delete ProductCategory
                </button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </React.Fragment>
      )}
    </Row>
  );
};
