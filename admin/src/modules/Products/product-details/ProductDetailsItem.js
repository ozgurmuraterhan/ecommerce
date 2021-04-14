import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import url from "@Helpers/api/url.json";

export const ProductDetailsItem = ({
  actionsLoading,
  productForDetails,
  editProductHandler,
  deleteProductHandler,
}) => {
  const [qty, setQty] = useState(1);

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
              <Link to={`/product/${productForDetails?.id}`}>
                <Card.Img
                  variant="top"
                  src={`${url.myBaseUrl}/products/${productForDetails?.pictureUrl}`}
                  alt={productForDetails?.name}
                  title={productForDetails?.name}
                />
              </Link>
              <Card.Body>
                <Link to={`/product/${productForDetails?.id}`}>
                  <Card.Title>{productForDetails?.name}</Card.Title>
                </Link>
                <Link to={`/productCategory/${productForDetails?.id}`}>
                  <Card.Text className="text-muted">{`${productForDetails?.category?.name}`}</Card.Text>
                </Link>
                <Card.Text>{productForDetails?.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  {`$ ${productForDetails?.price} - count : ${productForDetails?.countInStock}`}
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href={`/product/edit/${productForDetails?.id}`}>
                  Edit
                </Card.Link>
                <Card.Link
                  onClick={() => deleteProductHandler(productForDetails?.id)}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-3">
            <ListGroup>
              <ListGroupItem>
                {`Price : $ ${productForDetails?.price}`}
              </ListGroupItem>
              <ListGroupItem>
                {`Status : ${
                  productForDetails?.countInStock > 0
                    ? "In Stock"
                    : "Out of Stock"
                }`}
              </ListGroupItem>
              <ListGroupItem>
                <div className="form-group">
                  <label htmlFor="qty"> Quantity :</label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="form-control"
                    id="qty"
                  >
                    {[...Array(productForDetails?.countInStock).keys()].map(
                      (x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <button
                  type="button"
                  className="btn btn-primary"
                  //  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </ListGroupItem>
              <ListGroupItem>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => editProductHandler(productForDetails._id)}
                >
                  Edit Product
                </button>
              </ListGroupItem>
              <ListGroupItem>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteProductHandler(productForDetails._id)}
                >
                  Delete Product
                </button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </React.Fragment>
      )}
    </Row>
  );
};
