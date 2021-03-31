import { Link } from "react-router-dom";
import "./Product.css";
import { cartReducer } from "./../../redux/reducers/cartReducers";

const ProductItem = ({
  id,
  category,
  name,
  description,
  price,
  pictureUrl,
}) => {
  return (
    <div className="product">
      <div className="product__info">
        <div className="product__info__picture">
          <Link to={`/product/${id}`}>
            <img
              src={`http://localhost:8000/products/${pictureUrl}`}
              alt={name}
            />
          </Link>
        </div>
        <div className="product__info__details">
          <div className="product__info__name">
            <Link to={`/product/${id}`}>
              <h3>{name}</h3>
            </Link>
          </div>
          <div className="product__info__category">{`${category?.id}-${category?.name}`}</div>
          <div className="product__info__price">
            <span className="product__info__price__dollar">$</span> {price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
