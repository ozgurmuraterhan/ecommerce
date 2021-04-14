import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import url from "@Helpers/api/url.json";

const ProductCategoryItem = ({
  id,
  name,
  description,
  pictureUrl,
  deleteProductCategoryHandler,
}) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={3} className="mb-3 px-2">
      <Card>
        <Link to={`/productCategory/${id}`}>
          <Card.Img
            variant="top"
            src={`${url.myBaseUrl}/productCategories/${pictureUrl}`}
            alt={name}
            title={name}
          />
        </Link>
        <Card.Body>
          <Link to={`/productCategory/${id}`}>
            <Card.Title>{name}</Card.Title>
          </Link>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href={`/productCategory/edit/${id}`}>Edit</Card.Link>
          <Card.Link onClick={() => deleteProductCategoryHandler(id)}>
            Delete
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCategoryItem;
