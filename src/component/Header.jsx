"use client";
import React, { useContext } from "react";
import Container from "./Container";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { MainContext } from "@/app/Context/CartContext";

export default function Header() {
  const { cart } = useContext(MainContext);

  const cartItems = cart?.cart_data || [];

  const CartCount = cartItems.reduce(
    (total, item) => total + Number(item.qty || 0),
    0,
  );

  return (
    <header className=" bg-white/20 backdrop-blur-2xl border border-white/30 py-3 sticky top-0 z-9999">
      <Container className="flex items-center justify-between">
        <div>
          <span className="text-pink-500 font-bold text-4xl">
            E-Store<b className="text-black">.</b>
          </span>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Search for product"
            className="h-[50px]   border-1  pl-8 w-[400px] rounded-l-4xl  border-gray-200"
          />
          <div className="h-[50px] bg-pink-600 flex items-center rounded-r-4xl p-3 ">
            <FaSearch className=" text-1xl  text-white  ml-1 " />
          </div>
        </div>
        <Navbar CartCount={CartCount} />
      </Container>
    </header>
  );
}

const Navbar = ({ CartCount }) => {
  return (
    <nav className="flex items-center gap-5">
      {/* Navigation Links */}
      <ul className="flex items-center gap-3 font-semibold cursor-pointer">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={"/store"}>Store</Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Link href={"/cart"}>
            <FiShoppingCart className="cursor-pointer" />
          </Link>
          <span className="absolute -top-3 -right-4 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {CartCount}
          </span>
        </div>
      </div>
    </nav>
  );
};
