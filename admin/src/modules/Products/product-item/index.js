import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import url from "@Helpers/api/url.json";

const ProductItem = ({
  id,
  category,
  name,
  description,
  price,
  countInStock,
  pictureUrl,
  deleteProductHandler,
}) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={3} className="mb-3 px-2">
      <Card>
        <Link to={`/product/${id}`}>
          <Card.Img
            variant="top"
            src={`${url.myBaseUrl}/products/${pictureUrl}`}
            alt={name}
            title={name}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${id}`}>
            <Card.Title className="mb-0">{name}</Card.Title>
          </Link>
          <Link to={`/productCategory/${id}`}>
            <small className="text-muted">{`${category?.name}`}</small>
          </Link>
          <Card.Text className="mt-2">{description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {`$ ${price} - count : ${countInStock}`}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link href={`/product/edit/${id}`}>Edit</Card.Link>
          <Card.Link onClick={() => deleteProductHandler(id)}>Delete</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
