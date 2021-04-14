import { Link } from "react-router-dom";
import "./SideDrawer.css";

export const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = ["sidedrawer"];

  if (show) {
    sideDrawerClass.push("show");
  }

  return (
    show && (
      <div className={sideDrawerClass.join(" ")}>
        <ul className="sidedrawer__links" onClick={click}>
          <li>
            <Link to="/">Shop</Link>
          </li>
        </ul>
      </div>
    )
  );
};
