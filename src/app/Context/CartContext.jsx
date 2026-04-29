"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
export const MainContext = createContext();

export default function CartContext({ children }) {
  const [cart, setCart] = useState([]);
  console.log(cart, "cart");

  const isFirstReander = useRef(true);

  useEffect(() => {
    const storeItem = localStorage.getItem("cart");

    if (storeItem) {
      const parsed = JSON.parse(storeItem);
      if (Array.isArray(parsed)) {
        setCart(parsed);
      } else {
        setCart([]);
      }
    }
  }, []);

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 0) + 1 } // ✅ safe
        : item,
    );

    setCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const addtoCart = (product) => {
    setCart((prevCart) => {
      const itemExist = prevCart.find((item) => item.pId === product.id);
      if (itemExist) {
        return prevCart.map((item) =>
          item.pId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  //   const addtoCart = (product) => {
  //   setCart((prevCart) => {
  //     const itemExist = prevCart.find((item) => item.id === product.id);

  //     if (itemExist) {
  //       return prevCart.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     }
  //   });
  // };

  useEffect(() => {
    if (isFirstReander.current) {
      isFirstReander.current = false;
      return;
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const toggleCartItem = (product_id) => {
    const currentCart = [...cart];
    if (!currentCart.includes(product_id)) {
      currentCart.push(product_id);
      setCart(currentCart);
    } else {
      const index = currentCart.indexOf(product_id);
      currentCart.splice(index, 1);
      setCart(currentCart);
    }
  };

  // const addToCart = (Product) => {
  //   setCart();
  // };
  return (
    <MainContext.Provider
      value={{
        cart,
        setCart,
        addtoCart,
        toggleCartItem,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
