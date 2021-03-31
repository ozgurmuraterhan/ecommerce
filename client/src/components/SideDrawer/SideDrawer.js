import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SideDrawer.css";

const SideDrawer = ({ show, click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const sideDrawerClass = ["sidedrawer"];

  if (show) {
    sideDrawerClass.push("show");
  }

  return (
    show && (
      <div className={sideDrawerClass.join(" ")}>
        <ul className="sidedrawer__links" onClick={click}>
          <li>
            <Link to="/cart">
              <i className="fa fa-shopping-cart"></i>
              Cart{" "}
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </Link>
          </li>
          <li>
            <Link to="/">Shop</Link>
          </li>
        </ul>
      </div>
    )
  );
};

export default SideDrawer;
