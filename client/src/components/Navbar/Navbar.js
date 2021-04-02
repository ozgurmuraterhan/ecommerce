import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar">
        {/* logo */}
        <div className="navbar__logo">
          <Link to="/">
            <h2>ecommerce</h2>
          </Link>
        </div>

        {/* links */}
        <ul className="navbar__links">
          <li>
            <Link to="/cart" className="cart__link">
              <i className="fa fa-shopping-cart"></i>
              <span>
                cart
                <span className="cartlogo__badge">{getCartCount()}</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>

        {/* hamburger menu */}
        <div className="hamburger__menu" onClick={click}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
