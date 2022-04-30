import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Graphic Cards</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping></AiOutlineShopping>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart></Cart>}
    </div>
  );
};
export default Navbar;
