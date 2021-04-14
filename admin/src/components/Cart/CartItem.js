import { Link } from "react-router-dom";
import "./CartItem.css";

const CartItem = ({ item, qtyChangeHandler, removeFromCartHandler }) => {
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img
          src={`http://localhost:8000/products/${item.pictureUrl}`}
          alt={item.name}
        />
      </div>
      <Link to={`/product/${item.id}`} className="cart-item__name">
        <p>{item.name}</p>
      </Link>
      <p className="cart-item__price">$ {item.price}</p>
      <select
        className="cart-item__select"
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.id, e.target.value)}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cart-item__deleteBtn"
        onClick={() => removeFromCartHandler(item.id)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
