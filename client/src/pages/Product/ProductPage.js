import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getProductDetails } from "@Redux/cart-000/actions/productActions";
import { addToCart } from "@Redux/cart-000/actions/cartActions";

import "./ProductPage.css";

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, product, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cart");
  };

  return (
    <div className="container-fluid">
      <div className="product-page">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <React.Fragment>
            <div className="product-page__left">
              <div className="left__image">
                <img
                  src={`http://localhost:8000/products/${product.pictureUrl}`}
                  alt={product.name}
                />
              </div>
              <div className="left__info">
                <p className="left__info__name">{product.name}</p>
                <p>Digital</p>
                <p>{product.description}</p>
              </div>
            </div>
            <div className="product-page__right">
              <div className="right__info">
                <p>
                  price: <span>$ {product.price}</span>
                </p>
                <p>
                  status:{" "}
                  <span>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
                <p>
                  Qty:
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <button type="button" onClick={addToCartHandler}>
                    Add To Cart
                  </button>
                </p>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
