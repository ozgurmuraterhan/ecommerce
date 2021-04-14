import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import CartItem from "@Components/Cart/CartItem";

// Actions
import { addToCart, removeFromCart } from "@Redux/cart-000/actions/cartActions";

import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  return (
    <div className="cart-page">
      <div className="cart-page__left">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))
        )}
      </div>
      <div className="cart-page__right">
        <div className="cart-page__right__info">
          <p>Subtotal ({getCartCount()}) items</p>
          <p>$ {getCartSubTotal().toFixed(2)}</p>
        </div>
        <div>
          <button>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
