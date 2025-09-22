import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { removeCartItem, updateQuantity } from "../redux/userSlice";

const CartItemCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-md border hover:shadow-lg transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-5 w-full sm:w-auto group transition-all duration-500 ease-in-out">
        {/* Product Image */}
        <div className="relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-20 h-20 object-cover rounded-xl border border-gray-200 shadow-md 
                 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-xl"
          />
          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#ff4d2d]/20 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col transition-all duration-500">
          <h1
            className="font-semibold text-gray-800 text-base sm:text-lg 
                   group-hover:text-[#ff4d2d] group-hover:tracking-wide 
                   transition-all duration-500"
          >
            {data.name}
          </h1>
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            ₹{data.price} x {data.quantity}
          </p>
          <p
            className="font-bold text-gray-900 text-base sm:text-lg 
                   group-hover:text-[#ff4d2d] group-hover:scale-110 
                   transition-all duration-500"
          >
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 mt-4 sm:mt-0">
        {/* Decrease Button */}
        <button
          className="p-2 rounded-full bg-white/80 cursor-pointer border border-gray-200 shadow-sm 
               hover:bg-red-50 hover:border-red-300 hover:text-red-500 
               transition-all duration-300 transform hover:scale-110"
          onClick={() => handleDecrease(data.id, data.quantity)}
        >
          <FaMinus size={12} />
        </button>

        {/* Quantity Display */}
        <span className="font-semibold text-gray-800 px-3 py-1 bg-gray-50 rounded-md shadow-inner">
          {data.quantity}
        </span>

        {/* Increase Button */}
        <button
          className="p-2 cursor-pointer rounded-full bg-white/80 border border-gray-200 shadow-sm 
               hover:bg-green-50 hover:border-green-400 hover:text-green-600 
               transition-all duration-300 transform hover:scale-110"
          onClick={() => handleIncrease(data.id, data.quantity)}
        >
          <FaPlus size={12} />
        </button>

        {/* Delete Button */}
        <button
          className="p-2 cursor-pointer rounded-full bg-white/80 border border-gray-200 shadow-sm 
               text-red-500 hover:bg-red-100 hover:border-red-400 
               transition-all duration-300 transform hover:rotate-12 hover:scale-110"
          onClick={() => dispatch(removeCartItem(data.id))}
        >
          <TbTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
