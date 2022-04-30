import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Product } from "../components";

/* export interface ContextInterface {
  showCart: any;
  cartItems: any;
  totalQuantities: any;
  totalPrice: any;
  qty: any;
  incQty: any;
  decQty: any;
  onAdd: any;
} */
const Context = createContext<any>(null);

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: any;
  let index;

  const onAdd = (product: any, quantity: any) => {
    const checkProductInCart = cartItems.find(
      (item: any) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: any) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product: any) => {
    foundProduct = cartItems.find((item: any) => item._id === product._id);
    const newCartItems = cartItems.filter(
      (item: any) => item._id !== product._id
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );

    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: any, value: any) => {
    foundProduct = cartItems.find((item: any) => item._id === id);
    index = cartItems.findIndex((product: any) => product._id === id);
    const newCartItems = cartItems.filter((item: any) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1)
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        setTotalQuantities,
        setTotalPrice,
        setCartItems,
        showCart,
        setShowCart,
        cartItems,
        totalQuantities,
        totalPrice,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
