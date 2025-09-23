import React from "react";
import { IoArrowBackOutline, IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import { FaChevronRight } from "react-icons/fa6";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff3f1] to-[#fff9f9] flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-[900px]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="top-5 left-5 z-10">
            <button
              onClick={() => navigate("/")}
              className="w-12 h-12 flex items-center justify-center 
               bg-white/80 backdrop-blur-md rounded-full 
               shadow-md hover:shadow-lg border border-[#ff4d2d]/30
               text-[#ff4d2d] hover:bg-[#ff4d2d] hover:text-white 
               transition-all duration-300 ease-in-out group cursor-pointer"
            >
              <IoArrowBackOutline
                size={22}
                className="transform group-hover:-translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your Cart
          </h1>
        </div>

        {/* Cart Body */}
        {cartItems?.length === 0 ? (
          <div
            className="bg-white/80 backdrop-blur-xl border rounded-2xl shadow-md p-10 text-center 
                transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 text-white h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#ff4d2d] to-[#ff764d] shadow-lg animate-bounce">
                <IoCartOutline size={30}/>
              </div>
              <p className="text-gray-600 text-lg sm:text-xl font-semibold">
                Your Cart is Empty
              </p>
              <span className="text-sm text-gray-400">
                Start adding some delicious items
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard data={item} key={item.id} />
              ))}
            </div>

            {/* Total */}
            <div
              className="mt-6 bg-white/80 backdrop-blur-xl p-5 rounded-2xl 
             shadow-[0_8px_20px_rgba(0,0,0,0.08)] 
             flex justify-between items-center border border-white/40 
             transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02] cursor-default"
            >
              <h1 className="text-lg sm:text-xl font-semibold text-gray-700">
                Total Amount
              </h1>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ff4d2d] to-[#ff764d] bg-clip-text text-transparent">
                ₹{totalAmount}
              </span>
            </div>

            {/* Checkout */}
            <div className="mt-6 flex justify-end">
              <button
                className="relative overflow-hidden bg-gradient-to-r from-[#ff4d2d] to-[#ff764d] 
               text-white px-6 sm:px-10 py-3 sm:py-3.5 rounded-xl font-semibold 
               shadow-md hover:shadow-xl cursor-pointer 
               transition-all duration-500 ease-in-out transform hover:scale-105 group" onClick={()=>navigate("/checkout")}
              >
                {/* Glow effect */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-[#ffffff20] to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></span>

                {/* Button Text */}
                <span className="relative z-10 flex items-center gap-2" >
                  Proceed to Checkout
                  <FaChevronRight />
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
